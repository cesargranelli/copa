import { Injectable } from "@angular/core";

import { AngularFirestore } from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import "rxjs/operator/first";

import { Partida } from "../../models/partida";
import { Rodada } from "../../models/rodada";
import { User } from "../../models/user";
import { Aposta } from "../../models/aposta";
import { Usuario } from './../../models/usuario';

@Injectable()
export class CampeonatoProvider {

  constructor(private db: AngularFirestore) { }

  rodadas() {
    let rodadas: Rodada[] = [];

    this.db
      .collection("rounds")
      .valueChanges()
      .first()
      .subscribe((rounds: Rodada[]) => {
        rounds.forEach(round => {
          let hoje = "20180618";//new Date(new Date().setSeconds(-10800)).toISOString().substr(0, 10).replace(/[- ]/g, "");
          let fech = round.closed.replace(/[- ]/g, "");
          let next = round.next.replace(/[- ]/g, "");

          round.status = "campeonato";

          if (hoje >= fech) {
            rodadas[round.round] = round;
            if (hoje >= fech && hoje < next) {
              round.status = "rodada";
              rodadas[round.round].status = "rodada";
            }
            console.log("Atualizar pontuações...");
            this.pontuacoes(round);
          }
        });
      });

    this.db
      .collection("status")
      .add({
        datetime: new Date().getTime()
      });

  }

  pontuacoes(rodada: Rodada) {

    this.db
      .collection("users")
      .valueChanges()
      .subscribe(users => {
        users.map((user: Usuario) => {
          console.log("users");
          this.usuarios(user, rodada);
        });
      });

  }

  usuarios(usuario: Usuario, rodada: Rodada) {

    this.db
      .collection("users" , ref => ref.where("slug", "==", usuario.slug))
      .valueChanges()
      .first()
      .subscribe(users => {
        users.map((user: User) => {
          console.log("user");
          this.palpites(rodada, usuario);
        });
      });
  }

  palpites(rodada: Rodada, usuario: Usuario) {

    this.db
      .collection("hunches")
      .doc(usuario.slug)
      .collection(String(rodada.round))
      .valueChanges()
      .first()
      .subscribe(partidas => {
        partidas.map((partida: Partida) => {
          console.log("partida");
          this.resultados(rodada, usuario, partida);
        });
      });
  }

  resultados(rodada: Rodada, usuario: Usuario, partida: Partida) {

    if (usuario.rodada == undefined) {
      usuario.rodada = 0;
    }

    if (usuario.total == undefined) {
      usuario.total = 0;
    }

    this.db
    .collection("resultados")
    .doc(String(rodada.round))
    .collection(String(rodada.round), ref => ref.where("id", "==", partida.id))
    .valueChanges()
    .first()
    .subscribe(resultados => {

      resultados.map((resultado: Aposta) => {
        if (
          partida.homeScore != null &&
          partida.awayScore != null &&
          resultado.homeScore != null &&
          resultado.awayScore != null
        ) {

          if (rodada.status == "rodada") {
            usuario.rodada = usuario.rodada + this.somarPontos(rodada, usuario, partida, resultado);
          }
          usuario.total = usuario.total + this.somarPontos(rodada, usuario, partida, resultado);
        }

      });
      this.db
        .collection("campeonato")
        .doc(usuario.uid)
        .set({
          slug: usuario.slug,
          nick: usuario.nickname,
          uid: usuario.uid,
          idgame: partida.id,
          rodada: usuario.rodada,
          total: usuario.total,
          datetime: new Date().getTime()
        });
    });
    /*
    if (rodada.status == "rodada") {
      this.db
        .collection("campeonato")
        .doc(usuario.uid)
        .update({
          slug: usuario.slug,
          nick: usuario.nickname,
          uid: usuario.uid,
          idgame: partida.id,
          rodada: pontos
        });
    }

    this.db
      .collection("campeonato")
      .doc(usuario.uid)
      .update({
        slug: usuario.slug,
        nick: usuario.nickname,
        uid: usuario.uid,
        idgame: partida.id,
        campeonato: pontos
      });*/
  }

  somarPontos(rodada: Rodada, usuario: User, partida: Partida, resultado: Aposta): number {
    let pontos: number = 0;
    // Placar
    if (
      partida.homeScore == resultado.homeScore &&
      partida.awayScore == resultado.awayScore
    ) {
      return 25;
    }

    // Score Vencedor
    else if (
      partida.homeScore > partida.awayScore &&
      resultado.homeScore > resultado.awayScore &&
      partida.homeScore == resultado.homeScore &&
      partida.awayScore != resultado.awayScore
    ) {
      return 18;
    }
    else if (
      partida.awayScore > partida.homeScore &&
      resultado.awayScore > resultado.homeScore &&
      partida.awayScore == resultado.awayScore &&
      partida.homeScore != resultado.homeScore
    ) {
      return 18;
    }

    // Diferença
    else if (
      partida.homeScore > partida.awayScore &&
      resultado.homeScore > resultado.homeScore &&
      (partida.homeScore - partida.awayScore ==
       resultado.homeScore - resultado.awayScore)
    ) {
      return 15;
    }
    else if (
      partida.awayScore > partida.homeScore &&
      resultado.awayScore > resultado.awayScore &&
      (partida.awayScore - partida.homeScore ==
       resultado.awayScore - resultado.homeScore)
    ) {
      return 15;
    }

    // Score Perdedor
    else if (
      partida.homeScore < partida.awayScore &&
      resultado.homeScore < resultado.awayScore &&
      partida.homeScore == resultado.homeScore &&
      partida.awayScore != resultado.awayScore
    ) {
      return 12;
    }
    else if (
      partida.awayScore < partida.homeScore &&
      resultado.awayScore < resultado.homeScore &&
      partida.awayScore == resultado.awayScore &&
      partida.homeScore != resultado.homeScore
    ) {
      return 12;
    }

    // Time Vencedor
    else if (
      partida.homeScore > partida.awayScore &&
      resultado.homeScore > resultado.awayScore &&
      partida.homeScore - partida.awayScore !=
        resultado.homeScore - resultado.awayScore
    ) {
      return 10;
    }
    else if (
      partida.awayScore > partida.homeScore &&
      resultado.awayScore > resultado.homeScore &&
      partida.awayScore - partida.homeScore !=
        resultado.awayScore - resultado.homeScore
    ) {
      return 10;
    }

    // Empate não exato
    else if (
      partida.homeScore == partida.awayScore &&
      resultado.homeScore == resultado.awayScore &&
      (partida.homeScore - resultado.homeScore) != 0
    ) {
      return 15;
    }

    // Aposta empate e houver time vencedor
    else if (
      partida.homeScore == partida.awayScore &&
      resultado.homeScore != resultado.awayScore
    ) {
      return 2;
    }
    else if (
      resultado.homeScore == resultado.awayScore &&
      partida.homeScore != partida.awayScore
    ) {
      return 2;
    }

    return pontos;

  }

}
