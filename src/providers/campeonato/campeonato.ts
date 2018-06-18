import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { AngularFirestore } from "angularfire2/firestore";

import "rxjs/operator/first";

import { Partida } from "../../models/partida";
import { Rodada } from "../../models/rodada";
import { User } from "../../models/user";
import { Aposta } from "../../models/aposta";

@Injectable()
export class CampeonatoProvider {
  private users: User[][];
  partidas$: Observable<Partida[]>;
  palpites$: Observable<Partida[]>;

  constructor(private db: AngularFirestore) { }

  rodadas() {
    let rodadas: Rodada[] = [];

    this.db
      .collection("rounds")
      .valueChanges()
      .first()
      .subscribe((rounds: Rodada[]) => {
        rounds.forEach(round => {
          let hoje = new Date(new Date().setSeconds(-10800)).toISOString().substr(0, 10).replace(/[- ]/g, "");
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
            console.log(this.users);
          }
        });
      });
  }

  pontuacoes(rodada: Rodada) {

    this.db
      .collection("users")
      .valueChanges()
      .subscribe(users => {
        users.map((user: User) => {
          this.usuarios(user, rodada);
        });
      });

  }

  usuarios(usuario: User, rodada: Rodada) {

    this.db
      .collection("users" , ref => ref.where("slug", "==", usuario.slug))
      .valueChanges()
      .first()
      .subscribe(users => {
        users.map((user: User) => {
          this.palpites(rodada, usuario);
        });
      });
  }

  palpites(rodada: Rodada, usuario: User) {

    this.db
      .collection("hunches")
      .doc(usuario.slug)
      .collection(String(rodada.round))
      .valueChanges()
      .first()
      .subscribe(partidas => {
        partidas.map((partida: Partida) => {
          this.resultados(rodada, usuario, partida);
        });
      });
  }

  resultados(rodada: Rodada, usuario: User, partida: Partida) {

    let pontos = 0;
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
            pontos = pontos + this.somarPontos(rodada, usuario, partida, resultado);
          } else {
            pontos = pontos + this.somarPontos(rodada, usuario, partida, resultado);
          }
        }
      });
    });
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
      });
  }

  somarPontos(rodada: Rodada, usuario: User, partida: Partida, resultado: Aposta): number {
    let pontos: number = 0;
    // Placar
    if (
      partida.homeScore == resultado.homeScore &&
      partida.awayScore == resultado.awayScore
    ) {
      pontos = pontos + 25;
    }

    // Score Vencedor
    else if (
      partida.homeScore > partida.awayScore &&
      resultado.homeScore > resultado.awayScore &&
      partida.homeScore == resultado.homeScore &&
      partida.awayScore != resultado.awayScore
    ) {
      pontos = pontos + 18;
    }
    if (
      partida.awayScore > partida.homeScore &&
      resultado.awayScore > resultado.homeScore &&
      partida.awayScore == resultado.awayScore &&
      partida.homeScore != resultado.homeScore
    ) {
      pontos = pontos + 18;
    }

    // Diferença
    else if (
      partida.homeScore > partida.awayScore &&
      partida.homeScore != resultado.homeScore
    ) {
      if (
        partida.homeScore - partida.awayScore ==
        resultado.homeScore - resultado.awayScore
      ) {
        pontos = pontos + 15;
      }
    }
    if (
      partida.awayScore > partida.homeScore &&
      partida.awayScore != resultado.awayScore
    ) {
      if (
        partida.awayScore - partida.homeScore ==
        resultado.awayScore - resultado.homeScore
      ) {
        pontos = pontos + 15;
      }
    }

    // Score Perdedor
    else if (
      partida.homeScore < partida.awayScore &&
      partida.homeScore == resultado.homeScore &&
      partida.awayScore != resultado.awayScore
    ) {
      pontos = pontos + 12;
    }
    if (
      partida.awayScore < partida.homeScore &&
      partida.awayScore == resultado.awayScore &&
      partida.homeScore != resultado.homeScore
    ) {
      pontos = pontos + 12;
    }

    // Time Vencedor
    else if (
      partida.homeScore > partida.awayScore &&
      resultado.homeScore > resultado.awayScore &&
      partida.homeScore - partida.awayScore !=
        resultado.homeScore - resultado.awayScore
    ) {
      pontos = pontos + 10;
    }
    if (
      partida.awayScore > partida.homeScore &&
      partida.awayScore > resultado.homeScore &&
      partida.awayScore - partida.homeScore !=
        resultado.awayScore - resultado.homeScore
    ) {
      pontos = pontos + 10;
    }

    // Empate não exato
    else if (
      partida.homeScore == partida.awayScore &&
      resultado.homeScore == resultado.awayScore
    ) {
      pontos = pontos + 15;
    }

    // Aposta empate e houver time vencedor
    else if (
      partida.homeScore == partida.awayScore &&
      resultado.homeScore != resultado.awayScore
    ) {
      pontos = pontos + 2;
    }

    return pontos;

  }

}
