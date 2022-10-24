<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import Queue from "./../components/ts/Task/Queue";
import Stack from "./../components/ts/Task/Stack";
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

  nowQueue: <Operation>{ color: "#8a2be2", fontSize: "24px", message: "Queue" },
  nowStack: <Operation>{ color: "#8a2be2", fontSize: "24px", message: "Stack" },
});

const queues = computed(() => {
  return form.queue.Get();
});

const stacks = computed(() => {
  return form.stack.Get();
});

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

const SetDefault = () => {
  let preset = "";

  if (form.presetColor) preset = "color=#8a2be2";
  if (form.presetFontSize)
    preset += `${preset === "" ? "" : "&&"}fontSize=24px`;
  if (form.presetMessage)
    preset += `${preset === "" ? "" : "&&"}message=Your self`;

  form.command = preset;
};

const sleep = (waitTime: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

const main = async () => {
  console.log("mail");

  while (true) {
    await sleep(10 * 1000);

    const commandQueue = form.queue.Pop();
    const commandStack = form.stack.Pop();

    console.log("Queue", commandQueue);
    console.log("Stack", commandStack);

    if (commandQueue) form.nowQueue = commandQueue;
    if (commandStack) form.nowStack = commandStack;

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
      <div class="presets">
        <label for="color"
          >Set color
          <input
            type="checkbox"
            id="color"
            v-model="form.presetColor"
            @change="SetDefault"
        /></label>
        <label for="font-size"
          >Set font size
          <input
            type="checkbox"
            id="font-size"
            v-model="form.presetFontSize"
            @change="SetDefault"
        /></label>
        <label for="message"
          >Set message
          <input
            type="checkbox"
            id="message"
            v-model="form.presetMessage"
            @change="SetDefault"
        /></label>
      </div>

      <div>
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
            placeholder="color=#8a2be2&&fontSize=24px&&message=Your self"
            v-model="form.command"
            @keydown.enter="OnCommandEnter"
            ref="inputCommand"
        /></label>
      </div>
    </div>

    <div class="result-wrapper">
      <h2>Result</h2>
      <div class="result-field">
        <div class="result-content">
          <h3>Queue</h3>
          <span
            :style="`color: ${form.nowQueue.color}; font-size: ${form.nowQueue.fontSize}`"
            >{{ form.nowQueue.message }}</span
          >
          <br />

          <div>
            <h5>Now Command</h5>
            {{ form.nowQueue }}
          </div>
          <br />

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
          <h3>Stack</h3>
          <span
            :style="`color: ${form.nowStack.color}; font-size: ${form.nowStack.fontSize}`"
            >{{ form.nowStack.message }}</span
          >
          <br />

          <div>
            <h5>Now Command</h5>
            {{ form.nowStack }}
          </div>
          <br />

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
  display: flex;
  margin: 100px 50px;
}

.presets {
  display: grid;
  margin-right: 30px;
  text-align: left;
}

.result-wrapper {
  margin: 100px 50px;
}
.result-field {
  display: flex;
  margin-top: 30px;
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
