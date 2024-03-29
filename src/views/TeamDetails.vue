<template>
  <v-row class="no-gutters mt-4" v-if="!loading">
    <!---------------- USER TEAM SECTION -------------------------------------->
    <v-col cols="8">
      <TeamHeader :user="user" v-if="user"></TeamHeader>
      <!---------------- USER TEAM SECTION -------------------------------------->
      <UserTeam
        :currentRound="currentRoundIndex + 1"
        :user="user"
        :roundPlayersArray="roundPlayersArray"
        :captain="captain"
        :viceCaptain="viceCaptain"
        @selectedRound="changeSelectedRound"
        v-if="user && userPlayers"
      ></UserTeam>
      <div v-if="user && !userPlayers">
        <v-alert
          icon="fas fa-exclamation"
          prominent
          text
          type="info"
          class="mt-16"
        >
          {{ user.name }} does not have a team for round {{ selectedRound }}.
        </v-alert>
      </div>
    </v-col>
    <v-col cols="4" class="pl-4">
      <UserInfo
        :user="user"
        :currentRound="currentRoundIndex + 1"
        v-if="user"
      ></UserInfo>
      <!---------------- MATCH PREPARATION -------------------------------------->
      <MatchPrep
        v-if="user && userPlayers"
        :user="user"
        :currentRound="currentRoundIndex + 1"
        :isAdminLogged="true"
        :nextRoundUserTeam="nextRoundUserTeam"
        :isThisLoggedTeam="isThisLoggedTeam"
        :nextH2hRoundId="nextH2hRoundId"
        :nextCupRoundId="nextCupRoundId"
        :transfersMade="transfersMade"
        :nextRoundCaptains="nextRoundCaptains"
      ></MatchPrep>

      <!-- TRANSFERS INFORMATION  -->
      <!-- <TeamTransfers
        v-if="true"
        :user="user"
        :currentRound="currentRound"
      ></TeamTransfers> -->
    </v-col>
  </v-row>
  <!-- <main v-if="user && users && currentRound && players">
    <div class="main-container"> -->

  <!---------------- USER DETAILS -------------------------------------->
  <!-- 
    </div>
  </main> -->
</template>

<script>
const UserTeam = () => import("../components/TeamDetails/UserTeam.vue");
const UserInfo = () => import("../components/TeamDetails/UserInfo.vue");
const MatchPrep = () => import("../components/TeamDetails/MatchPrep.vue");
const TeamHeader = () => import("../components/TeamDetails/TeamHeader.vue");

// const PlayerPopup = () => import("../Popup/PlayerPopup");
import { mapState, mapActions } from "vuex";

export default {
  name: "TeamDetails",
  components: {
    UserTeam,
    UserInfo,
    MatchPrep,
    TeamHeader,
    // PlayerPopup,
    // TeamTransfers,
  },
  props: {},
  data() {
    return {
      popupShow: false,
      popupPlayer: "",
      user: null,
      selectedRound: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions("user", [
      "fetchLoggedUser",
      "fetchUserPlayers",
      "fetchUser",
      "fetchNextRoundCaptains",
    ]),
    ...mapActions("rounds", ["fetchRounds"]),
    ...mapActions("cup", ["fetchCupRounds"]),
    ...mapActions("transfers", ["fetchTransfers"]),
    changeSelectedRound(event) {
      this.selectedRound = event;
    },
    // playerPopupHandler(p) {
    //   this.popupShow = true;
    //   this.popupPlayer = this.players[p];
    // },
    // deselectPlayer() {
    //   return (this.popupPlayer = "");
    // },
    // closePopup() {
    //   return (this.popupShow = false);
    // },
  },
  computed: {
    ...mapState("user", ["loggedUser", "userPlayers", "nextRoundCaptains"]),
    ...mapState("rounds", ["currentRoundIndex", "rounds"]),
    ...mapState("cup", ["cupRounds"]),
    ...mapState("transfers", ["transfers"]),
    isThisLoggedTeam() {
      return this.user.id === this.loggedUser.id;
      // return true;
    },
    roundPlayersArray() {
      const positions = [
        "dc1",
        "dc2",
        "dl1",
        "dl2",
        "dr1",
        "dr2",
        "gk",
        "mc1",
        "mc2",
        "ml1",
        "ml2",
        "mr1",
        "mr2",
        "st1",
        "st2",
        "st3",
      ];
      return this.userPlayers
        ? Object.entries(this.userPlayers)
            .filter(([position]) => positions.includes(position))
            .map(([position, player]) => {
              return { position, player: player[0] };
            })
        : [];
    },
    captain() {
      return this.userPlayers?.cpt[0];
    },
    viceCaptain() {
      return this.userPlayers?.vice_cpt[0];
    },
    nextH2hRoundId() {
      const isNextRoundH2h =
        this.rounds[this.currentRoundIndex + 1]?.head_to_head;
      return isNextRoundH2h
        ? this.rounds[this.currentRoundIndex + 1]?.id
        : null;
    },
    nextCupRoundId() {
      const nextRoundEndDate = this.rounds[this.currentRoundIndex + 1]?.to_date;
      return this.cupRounds.find(
        (cupRound) => cupRound.to_date == nextRoundEndDate
      )?.id;
    },
    nextRoundUserTeam() {
      const newPlayers = this.transfers
        .filter(
          ({ round_id, user_id }) =>
            +round_id === this.currentRoundIndex + 1 &&
            +this.user.id === +user_id
          // TO DO && status === "approved"
        )
        .reduce((acc, { to_player, position }) => {
          acc[position] = to_player;
          return acc;
        }, {});

      const updatedPlayers = this.roundPlayersArray.map(
        ({ position, player }) => {
          if (newPlayers[position]) {
            return {
              position,
              player: newPlayers[position],
            };
          }
          return { position, player };
        }
      );

      return updatedPlayers;
    },
    transfersMade() {
      return this.transfers.filter(
        ({ round_id, user_id, status }) =>
          +round_id === this.currentRoundIndex + 1 &&
          +this.user.id === +user_id &&
          status === "approved"
      ).length;
    },
    userId() {
      return this.$route.params.userId;
    },
  },
  watch: {
    currentRoundIndex(newIndex) {
      if (newIndex) {
        this.selectedRound = +this.currentRoundIndex + 1;
      }
    },
    // async selectedRound(newRound) {
    // await this.fetchUserPlayers({
    //   userId: this.user?.id,
    //   round_id: newRound,
    // });
    // },
  },
  async created() {
    this.loading = true;
    this.user = await this.fetchUser({ userId: this.userId });
    await this.fetchCupRounds();
    await this.fetchTransfers();
    await this.fetchLoggedUser();
    await this.fetchRounds();
    await this.fetchUserPlayers({
      userId: this.user?.id,
      round_id: 13,
      // round_id: this.selectedRound,
      queryParams: {
        points: true,
      },
    });
    await this.fetchNextRoundCaptains({
      userId: this.user?.id,
      // round_id: 13,
      round_id: +this.currentRoundIndex + 2,
    });
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">
@import "@/common/breakpoints.scss";
</style>
