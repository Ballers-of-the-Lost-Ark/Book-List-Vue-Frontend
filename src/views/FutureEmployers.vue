<template>
  <div>
    <div class="text-center">
      <h1 class="text-h3 text-sm-h2">To Future Employers</h1>
      <h3 class="text-sm-h6 text-lg-h5 ml-lg-2 mt-4">
        Hello, my name is Nick. If you're reading this, then you are considering
        hiring me. Here's why you should:
      </h3>
    </div>

    <div class="d-flex justify-center mt-4">
      <ol>
        <li>
          I taught myself to program at 18. Using nothing but Google and one
          online course.
        </li>
        <li>
          At 19 I was entrusted to work with my current company's vice president
          to developing software.
        </li>
        <li>I never quit.</li>
      </ol>
    </div>

    <p class="mt-5 text-center">
      This is a demo project that shows off my skills. For the nerds (technical)
      you can view the source code
      <a
        href="https://github.com/Ballers-of-the-Lost-Ark?tab=projects"
        target="_blank"
        >here.</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FutureEmployers extends Vue {}
</script>

<style scoped></style>
