<template>
  <section class="elevation-8">
    <!-- <TeamHeader :user="user"></TeamHeader> -->

    <div class="user-team">

      <div class="team-round-change">
        <div class="buttons-cont">
          <v-btn
            :disabled="isShowingFirstRnd"
            color="#3c474d"
            class="ma-2 white--text"
            @click.prevent="previousRound()"
          >
            <v-icon small left color="white">fas fa-arrow-left</v-icon>
            Previous
          </v-btn>

          <span class="round up" v-if="selectedRound"
            >Round {{ selectedRound }}</span
          >
          <v-btn
            :disabled="isShowingLastRnd"
            color="#3c474d"
            class="ma-2 white--text"
            @click.prevent="nextRound()"
          >
            Next
            <v-icon small right color="white">fas fa-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>

      <div class="team" v-if="rndShow">
        <!------------------ TEAMMATE  ----------------->
        <Teammate
          v-for="{ position, player } in roundPlayersArray"
          :key="position"
          :class="position"
          :position="position"
          :player="player"
          :isTripple="false"
          :isCap="isCap(player)"
          :isVCap="isVCap(player)"
          :isVCActive="false"
          :selectedRound="selectedRound"
        ></Teammate>
        <div class="round-total-points up elevation-5">
          {{ rndShowTotal }}
          <br />points
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import Teammate from "./Teammate";
// import TeamHeader from "./TeamHeader.vue";
// import roundPointsCalculator from "../../../utils/roundPointsCalculator";
export default {
  name: "UserTeam",
  components: {
    Teammate,
    // TeamHeader,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    roundPlayersArray: {
      type: Array,
      required: true,
    },
    captain: {
      type: Object,
      required: true,
    },
    viceCaptain: {
      type: Object,
      required: true,
    },
    currentRound: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedRound: 0,
    };
  },
  computed: {
    isShowingLastRnd() {
      return Number(this.selectedRound) === this.currentRound;
    },
    isShowingFirstRnd() {
      return Number(this.selectedRound) === 1;
    },
    rndShow: {
      get: function () {
        return {};
      },
      set: function (v) {
        return (this.selectedRound = v);
      },
    },
    rndShowTotal() {
      // const total = roundPointsCalculator(
      //   this.rndShow,
      //   this.selectedRound,
      //   this.players,
      //   false
      // );
      return 100;
    },
  },
  methods: {
    ...mapActions("rounds", ["fetchRounds"]),
    previousRound() {
      if (this.selectedRound > 1) this.selectedRound--;
      this.$emit("selectedRound", this.selectedRound);
    },
    nextRound() {
      if (this.selectedRound < this.currentRound) this.selectedRound++;
      this.$emit("selectedRound", this.selectedRound);
    },
    isCap({ id }) {
      return id === this.captain.id;
    },
    isVCap({ id }) {
      return id === this.viceCaptain.id;
    },
    // playerPopupHandler(p) {
    //   return this.$emit("playerPopupHandler", p);
    // },
    // isVCActive() {
    //   // const isLast = this.selectedRound === this.currentRound;
    //   // if (!isLast) {
    //   if (!this.players[this.rndShow.cpt]) {
    //     // console.log("1a");
    //     return true;
    //   }
    //   const hasCptPlayed =
    //     this.players[this.rndShow.cpt].points[`r${this.selectedRound}`].roundStats
    //       .starter ||
    //     this.players[this.rndShow.cpt].points[`r${this.selectedRound}`].roundStats
    //       .sub;
    //   // console.log("2a");
    //   return !hasCptPlayed;
    //   // } else {
    //   //   console.log("3a");
    //   //   return false;
    //   // }
    // },
    // resetRndShow() {
    //   this.rndShow = Object.keys(this.user.rounds).length;
    // },
  },
  async created() {
    await this.fetchRounds();
    this.selectedRound = this.currentRound;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/common/breakpoints.scss";
/********************  USER TEAM **********************/
.user-team {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #d3d3d3;
  overflow: hidden;
  @media #{$mobile} {
    width: 95%;
    align-items: center;
  }
}
/**************  ROUND CHANGE ********************/
.team-round-change {
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #3c474d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buttons-cont {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media #{$mobile} {
    width: 100%;
    justify-content: space-evenly;
  }
}
// .prev {
//   text-align: right;
// }
// .next {
//   text-align: left;
// }
// .prev,
// .next {
//   display: inline-block;
//   width: 150px;
//   height: 35px;
//   color: #3c474d;
//   background-color: #9fa5a9;
//   font-size: 0.875rem;
//   text-decoration: none;
//   line-height: 35px;
//   padding: 0 10px 0 10px;
//   font-weight: bold;
//   position: relative;
//   transition: all 0.3s;
//   @media #{$mobile} {
//     width: 25%;
//     text-align: center;
//   }
// }
// .prev:hover,
// .next:hover {
//   /*text-decoration: underline;*/
//   background-color: #c6c6c6;
//   border: 1px solid #1b2e32;
//   -webkit-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
//   -moz-box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
//   box-shadow: 6px 6px 17px -11px rgba(0, 0, 0, 0.43);
// }
.round {
  font-size: 1.25rem;
  font-weight: bold;
}
// .prev img {
//   width: 10%;
//   position: absolute;
//   top: 11px;
//   left: 11px;
//   z-index: 10;
//   @media #{$mobile} {
//     display: none;
//   }
// }
// .next img {
//   width: 10%;
//   position: absolute;
//   top: 11px;
//   right: 11px;
//   z-index: 10;
//   @media #{$mobile} {
//     display: none;
//   }
// }
// .prev div,
// .next div {
//   display: inline-block;
//   background-color: transparent;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0px;
//   left: 0px;
// }
// .prev div::after,
// .next div::after {
//   position: absolute;
//   top: 7px;
//   content: "";
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: #3c474d87;
//   transition: all 0.3s;
//   opacity: 0;
//   z-index: 0;
//   @media #{$mobile} {
//     display: none;
//   }
// }
// .prev div::after {
//   left: 8px;
// }
// .next div::after {
//   right: 8px;
// }
// .prev div:hover::after,
// .next div:hover::after {
//   opacity: 0.4;
//   transform: scale(1.4);
// }
/******************************************************************
  ******************      FIELD WITH PLAYERS *************************/
.team {
  width: 100%;
  background-image: url("../../assets/images/user-page/pitch1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 20px 0 0 0;
  padding: 10px 0 20px 0;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  position: relative;
  background-color: #93ab90;
  @media #{$mobile} {
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    grid-template-columns: repeat(8, 1fr);
    margin: 26px 0 0 0;
  }
}
.gk,
.dl1,
.dl2,
.dc1,
.dc2,
.dr1,
.dr2,
.ml1,
.ml2,
.mc1,
.mc2,
.mr1,
.mr2,
.st1,
.st2,
.st3 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
/************SQUAD POSITIONING ****************
*******************************************/
.gk {
  grid-row: 11 / span 2;
  grid-column: 5 / span 2;
  @media #{$mobile} {
    grid-column: 4 / span 2;
  }
}
.dl1 {
  grid-row: 7 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}
.dl2 {
  grid-row: 9 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}
.dc1 {
  grid-row: 8 / span 2;
  grid-column: 4 / span 2;
  @media #{$mobile} {
    grid-column: 3 / span 2;
  }
}
.dc2 {
  grid-row: 8 / span 2;
  grid-column: 6 / span 2;
  @media #{$mobile} {
    grid-column: 5 / span 2;
  }
}
.dr1 {
  grid-row: 7 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}
.dr2 {
  grid-row: 9 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}
.ml1 {
  grid-row: 3 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}
.ml2 {
  grid-row: 5 / span 2;
  grid-column: 2 / span 2;
  @media #{$mobile} {
    grid-column: 1 / span 2;
  }
}
.mc1 {
  grid-row: 4 / span 2;
  grid-column: 4 / span 2;
  @media #{$mobile} {
    grid-column: 3 / span 2;
  }
}
.mc2 {
  grid-row: 4 / span 2;
  grid-column: 6 / span 2;
  @media #{$mobile} {
    grid-column: 5 / span 2;
  }
}
.mr1 {
  grid-row: 3 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}
.mr2 {
  grid-row: 5 / span 2;
  grid-column: 8 / span 2;
  @media #{$mobile} {
    grid-column: 7 / span 2;
  }
}
.st1 {
  grid-row: 1 / span 2;
  grid-column: 3 / span 2;
  @media #{$mobile} {
    grid-column: 2 / span 2;
  }
}
.st2 {
  grid-row: 1 / span 2;
  grid-column: 5 / span 2;
  @media #{$mobile} {
    grid-column: 4 / span 2;
  }
}
.st3 {
  grid-row: 1 / span 2;
  grid-column: 7 / span 2;
  @media #{$mobile} {
    grid-column: 6 / span 2;
  }
}
/************** ROUND TOTAL *******************/
.round-total-points {
  position: absolute;
  top: 0px;
  right: 0px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px;
  color: white;
  background-color: #154c1b;
  border-bottom-left-radius: 10px;
  @media #{$mobile} {
    left: 0px;
    width: 100%;
    background-image: none;
    height: 20px;
    top: -23px;
    & br {
      display: none;
    }
  }
}
</style>
