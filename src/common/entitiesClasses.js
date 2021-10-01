export class Round {
  constructor({ id, name, season_id, from_date, to_date, head_to_head }) {
    this.id = id;
    this.name = name;
    this.season_id = season_id;
    this.from_date = from_date;
    this.to_date = to_date;
    this.head_to_head = head_to_head;
  }
}
export class H2HSquadPayload {
  constructor({
    scheme,
    round_id,
    whoscored_id_1,
    whoscored_id_2,
    whoscored_id_3,
    whoscored_id_4,
    whoscored_id_5,
    whoscored_id_6,
    whoscored_id_7,
    whoscored_id_8,
    whoscored_id_9,
    whoscored_id_10,
    whoscored_id_11,
  }) {
    this.scheme = scheme;
    this.round_id = round_id;
    this.whoscored_id_1 = whoscored_id_1;
    this.whoscored_id_2 = whoscored_id_2;
    this.whoscored_id_3 = whoscored_id_3;
    this.whoscored_id_4 = whoscored_id_4;
    this.whoscored_id_5 = whoscored_id_5;
    this.whoscored_id_6 = whoscored_id_6;
    this.whoscored_id_7 = whoscored_id_7;
    this.whoscored_id_8 = whoscored_id_8;
    this.whoscored_id_9 = whoscored_id_9;
    this.whoscored_id_10 = whoscored_id_10;
    this.whoscored_id_11 = whoscored_id_11;
  }
}
export class CupSquadPayload {
  constructor({ round_id, dc, dl, dr, gk, mc, ml, mr, st }) {
    this.round_id = round_id;
    this.dc = dc;
    this.dl = dl;
    this.dr = dr;
    this.gk = gk;
    this.mc = mc;
    this.ml = ml;
    this.mr = mr;
    this.st = st;
  }
}
