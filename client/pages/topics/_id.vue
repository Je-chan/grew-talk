<template>
  <div class="board-container">
    <section v-if="boardList.length > 0" class="board">
      <nuxt-link
        v-for="b in boardList"
        :key="b._id"
        :class="['board-item', $route.params.id === b.slug && 'active']"
        :to="{
        name: 'topics-id',
        params: {
          id: b.slug
        }
      }"
      >{{b.title}}</nuxt-link>
    </section>
    <section class="article-list">
      <GlobalArticleCard v-for="a in articleList" :article="a" :key="a._id" />
      <infinite-loading @infinite="getBoardArticleList"></infinite-loading>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boardList: [],
      articleList: [],
      lastIndex: 0
    };
  },
  created() {
    this.getBoardList();
  },
  mounted() {
    console.log('articleList', this.articleList)
  },
  methods: {
    async getBoardList() {
      const data = await this.$api.$get("/board/list");
      this.boardList = data;
    },
    getBoardArticleList($state) {
      // 인피니트 로딩은 setTimeout 을 잡아두는 게 좋다.
      setTimeout(async () => {
        // lastIndex 의 값이 매번 달라질 수 있도록 만들기 위한 방법
        if (this.articleList.length > 0) {
          this.lastIndex = this.articleList[this.articleList.length - 1]._id;
        }

        const data = await this.$api.$get(
          `/board/${this.$route.params.id}?lastIndex=${this.lastIndex}`
        );
        if (data.article.length === 0) {
          // 다 끝난 경우에는 complete 을 호출해서 아예 끝나도록 만드는 것.
          $state.complete();
        } else {
          this.articleList = this.articleList.concat(data.article);
          $state.loaded();
        }
      }, 100);
    }
  }
};
</script>
<style lang="scss" scoped>
.board-container {
  padding: 32px 0;
  width: 100%;
  max-width: 1100px;
  margin: auto;
  section.board {
    font-size: 14px;
    height: 35px;
    width: 100%;
    padding-top: 9px;
    border-bottom: 2px solid #dbdee7;
    a {
      color: rgb(148, 150, 155);
      padding: 0 32px 20px;
      border-bottom: 2px solid transparent;
      &.active {
        color: rgb(34, 34, 34);
      }
    }
  }
  .article-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style> 