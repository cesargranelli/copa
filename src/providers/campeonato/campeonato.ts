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
  partidas$: Observable<Partida[]>;
  palpites$: Observable<Partida[]>;

  constructor(private db: AngularFirestore) {}

  resultados(): any {
    this.rodadas();
  }

  rodadas() {
    let rodadas: Rodada[] = [];

    this.db
      .collection("rounds")
      .valueChanges()
      .first()
      .subscribe((rounds: Rodada[]) => {
        rounds.forEach(round => {
          let hoje =
            new Date().toLocaleString(["pt-BR"]).substr(6, 4) +
            new Date().toLocaleString(["pt-BR"]).substr(3, 2) +
            new Date().toLocaleString(["pt-BR"]).substr(0, 2);
          let fech = round.closed.replace(/[- ]/g, "");
          let next = round.next.replace(/[- ]/g, "");

          round.status = "campeonato";
          if (hoje >= fech) {
            rodadas[round.round] = round;
            if (hoje >= fech && hoje < next) {
              round.status = "rodada";
              rodadas[round.round].status = "rodada";
            }
            this.palpites(round);
          }
        });
      });
  }

  palpites(rodada) {
    let competidor: {
      slug: string;
      nick: string;
      uid: string;
      rodada: number;
      campeonato: number;
    }[] = [];

    competidor["rodada"] = 0;
    competidor["campeonato"] = 0;

    this.db
      .collection("users" /*, ref => ref.where("slug", "==", "rockman-dx")*/)
      .valueChanges()
      .subscribe(users => {
        users.map((user: User) => {
          competidor["slug"] = user.slug;
          competidor["nick"] = user.nickname;
          competidor["uid"] = user.uid;

          this.db
            .collection("hunches")
            .doc(user.slug)
            .collection(String(rodada.round))
            .valueChanges()
            .subscribe(jogos => {
              jogos.map((jogo: Partida) => {
                this.db
                  .collection("resultados")
                  .doc(String(rodada.round))
                  .collection(String(rodada.round), ref =>
                    ref.where("id", "==", jogo.id)
                  )
                  .valueChanges()
                  .subscribe(resultados => {
                    resultados.map((resultado: Aposta) => {
                      if (
                        jogo.homeScore != null &&
                        jogo.awayScore != null &&
                        resultado.homeScore != null &&
                        resultado.awayScore != null
                      ) {
                        if (rodada.status == "rodada") {
                          // Placar
                          if (
                            jogo.homeScore == resultado.homeScore &&
                            jogo.awayScore == resultado.awayScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 25;
                          }

                          // Score Vencedor
                          else if (
                            jogo.homeScore > jogo.awayScore &&
                            resultado.homeScore > resultado.awayScore &&
                            jogo.homeScore == resultado.homeScore &&
                            jogo.awayScore != resultado.awayScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 18;
                          }
                          if (
                            jogo.awayScore > jogo.homeScore &&
                            resultado.awayScore > resultado.homeScore &&
                            jogo.awayScore == resultado.awayScore &&
                            jogo.homeScore != resultado.homeScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 18;
                          }

                          // Diferença
                          else if (
                            jogo.homeScore > jogo.awayScore &&
                            jogo.homeScore != resultado.homeScore
                          ) {
                            if (
                              jogo.homeScore - jogo.awayScore ==
                              resultado.homeScore - resultado.awayScore
                            ) {
                              competidor["rodada"] = competidor["rodada"] + 15;
                            }
                          }
                          if (
                            jogo.awayScore > jogo.homeScore &&
                            jogo.awayScore != resultado.awayScore
                          ) {
                            if (
                              jogo.awayScore - jogo.homeScore ==
                              resultado.awayScore - resultado.homeScore
                            ) {
                              competidor["rodada"] = competidor["rodada"] + 15;
                            }
                          }

                          // Score Perdedor
                          else if (
                            jogo.homeScore < jogo.awayScore &&
                            jogo.homeScore == resultado.homeScore &&
                            jogo.awayScore != resultado.awayScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 12;
                          }
                          if (
                            jogo.awayScore < jogo.homeScore &&
                            jogo.awayScore == resultado.awayScore &&
                            jogo.homeScore != resultado.homeScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 12;
                          }

                          // Time Vencedor
                          else if (
                            jogo.homeScore > jogo.awayScore &&
                            resultado.homeScore > resultado.awayScore &&
                            jogo.homeScore - jogo.awayScore !=
                              resultado.homeScore - resultado.awayScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 10;
                          }
                          if (
                            jogo.awayScore > jogo.homeScore &&
                            jogo.awayScore > resultado.homeScore &&
                            jogo.awayScore - jogo.homeScore !=
                              resultado.awayScore - resultado.homeScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 10;
                          }

                          // Empate não exato
                          else if (
                            jogo.homeScore == jogo.awayScore &&
                            resultado.homeScore == resultado.awayScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 15;
                          }

                          // Aposta empate e houver time vencedor
                          else if (
                            jogo.homeScore == jogo.awayScore &&
                            resultado.homeScore != resultado.awayScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 2;
                          }

                          this.db
                            .collection("rodada")
                            .doc(user.uid)
                            .set({
                              slug: user.slug,
                              nick: user.nickname,
                              uid: user.uid,
                              idgame: jogo.id,
                              rodada: competidor["rodada"],
                              campeonato: competidor["campeonato"]
                            });
                        }
                        // Placar
                        if (
                          jogo.homeScore == resultado.homeScore &&
                          jogo.awayScore == resultado.awayScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 25;
                        }

                        // Score Vencedor
                        else if (
                          jogo.homeScore > jogo.awayScore &&
                          resultado.homeScore > resultado.awayScore &&
                          jogo.homeScore == resultado.homeScore &&
                          jogo.awayScore != resultado.awayScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 18;
                        }
                        if (
                          jogo.awayScore > jogo.homeScore &&
                          resultado.awayScore > resultado.homeScore &&
                          jogo.awayScore == resultado.awayScore &&
                          jogo.homeScore != resultado.homeScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 18;
                        }

                        // Diferença
                        else if (
                          jogo.homeScore > jogo.awayScore &&
                          jogo.homeScore != resultado.homeScore
                        ) {
                          if (
                            jogo.homeScore - jogo.awayScore ==
                            resultado.homeScore - resultado.awayScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 15;
                          }
                        }
                        if (
                          jogo.awayScore > jogo.homeScore &&
                          jogo.awayScore != resultado.awayScore
                        ) {
                          if (
                            jogo.awayScore - jogo.homeScore ==
                            resultado.awayScore - resultado.homeScore
                          ) {
                            competidor["rodada"] = competidor["rodada"] + 15;
                          }
                        }

                        // Score Perdedor
                        else if (
                          jogo.homeScore < jogo.awayScore &&
                          jogo.homeScore == resultado.homeScore &&
                          jogo.awayScore != resultado.awayScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 12;
                        }
                        if (
                          jogo.awayScore < jogo.homeScore &&
                          jogo.awayScore == resultado.awayScore &&
                          jogo.homeScore != resultado.homeScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 12;
                        }

                        // Time Vencedor
                        else if (
                          jogo.homeScore > jogo.awayScore &&
                          resultado.homeScore > resultado.awayScore &&
                          jogo.homeScore - jogo.awayScore !=
                            resultado.homeScore - resultado.awayScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 10;
                        }
                        if (
                          jogo.awayScore > jogo.homeScore &&
                          jogo.awayScore > resultado.homeScore &&
                          jogo.awayScore - jogo.homeScore !=
                            resultado.awayScore - resultado.homeScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 10;
                        }

                        // Empate não exato
                        else if (
                          jogo.homeScore == jogo.awayScore &&
                          resultado.homeScore == resultado.awayScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 15;
                        }

                        // Aposta empate e houver time vencedor
                        else if (
                          jogo.homeScore == jogo.awayScore &&
                          resultado.homeScore != resultado.awayScore
                        ) {
                          competidor["rodada"] = competidor["rodada"] + 2;
                        }
                        this.db
                          .collection("campeonato")
                          .doc(user.uid)
                          .set({
                            slug: user.slug,
                            nick: user.nickname,
                            uid: user.uid,
                            idgame: jogo.id,
                            rodada: competidor["rodada"],
                            campeonato: competidor["campeonato"]
                          });
                      }
                    });
                  });
              });
            });
        });
      });
  }
}
