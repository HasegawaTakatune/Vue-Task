<script setup lang="ts">
import Queue from "./../components/ts/Task/Queue";
import Stack from "./../components/ts/Task/Stack";
import { computed, onMounted, reactive, ref } from "vue";
import type Operation from "./../components/ts/Command/interface/Operation";

enum AttachType {
  BOTH,
  QUEUE,
  STACK,
  LENGTH,
}

const inputCommand = ref();

const form = reactive({
  queue: new Queue(),
  stack: new Stack(),

  attachOf: AttachType.BOTH,

  presetColor: false,
  presetFontSize: false,
  presetMessage: false,

  command: "",

  mowQueue: <Operation>{ color: "", fontSize: "", message: "Queue" },
  nowStack: <Operation>{ color: "", fontSize: "", message: "Stack" },
});

const queues = computed(() => {
  return form.queue.Get();
});

const stacks = computed(() => {
  return form.stack.Get();
});

const sleep = (waitTime: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

const OnCommandEnter = () => {
  console.log(`Enter ${form.attachOf.toString()}`);

  if (form.attachOf === AttachType.QUEUE || form.attachOf === AttachType.BOTH) {
    form.queue.Push(form.command);
  }

  if (form.attachOf === AttachType.STACK || form.attachOf === AttachType.BOTH) {
    form.stack.Push(form.command);
  }

  console.log(form.queue);
  console.log(form.stack);
};

const main = async () => {
  console.log("mail");

  while (true) {
    await sleep(1000);
    console.log("loop");
  }
};

onMounted(() => {
  main();
});
</script>

<template>
  <main class="main-wrapper">
    <div class="operation-wrapper">
      <div>
        <label for="both">
          <input
            type="radio"
            name="type"
            id="both"
            :value="AttachType.BOTH"
            v-model="form.attachOf"
            @change="inputCommand.focus()"
          />Both</label
        >
        <label for="queue">
          <input
            type="radio"
            name="type"
            id="queue"
            :value="AttachType.QUEUE"
            v-model="form.attachOf"
            @change="inputCommand.focus()"
          />Queue</label
        >
        <label for="stack">
          <input
            type="radio"
            name="type"
            id="stack"
            :value="AttachType.STACK"
            v-model="form.attachOf"
            @change="inputCommand.focus()"
          />Stack</label
        >
      </div>

      <label for="command"
        ><input
          type="text"
          id="command"
          placeholder="color=#8a2be2&&fontSize=24&&message=Your self"
          v-model="form.command"
          @keydown.enter="OnCommandEnter"
          ref="inputCommand"
      /></label>
    </div>

    <div class="result-wrapper">
      <h3>Result</h3>
      <div class="result-field">
        <div class="result-content">
          <span>Queue</span>
          <div>
            <h5>Commands</h5>
            <ol>
              <li v-for="(value, index) in queues" :key="index">
                {{ value }}
              </li>
            </ol>
          </div>
        </div>
        <div class="result-content">
          <span>Stack</span>
          <div>
            <h5>Commands</h5>
            <ol>
              <li v-for="(value, index) in stacks" :key="index">
                {{ value }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-wrapper {
  width: 100%;
  text-align: center;
}

.operation-wrapper {
  margin: 100px 50px;
}

.result-wrapper {
  margin: 100px 50px;
}
.result-field {
  display: flex;
}

.result-content {
  width: 40rem;
}

#command {
  width: 30rem;
}

#both,
#queue,
#stack {
  margin: 0 0 0 30px;
}
</style>
