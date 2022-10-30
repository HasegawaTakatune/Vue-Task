<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import Queue from "./../components/ts/Task/Queue";
import Stack from "./../components/ts/Task/Stack";
import type Operation from "./../components/ts/Command/interface/Operation";
import type Form from "./interface/Form";
import { AttachType } from "./enum/AttachType";

const inputCommand = ref();

const form = reactive(<Form>{
  power: false,

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

const power = computed(() => {
  return form.power ? "Start" : "Stop";
});

const OnCommandEnter = () => {
  if (form.attachOf === AttachType.QUEUE || form.attachOf === AttachType.BOTH) {
    form.queue.Push(form.command);
  }

  if (form.attachOf === AttachType.STACK || form.attachOf === AttachType.BOTH) {
    form.stack.Push(form.command);
  }
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

const AttachCommand = (base: Operation, attach: Operation): Operation => {
  return {
    color: attach.color ?? base.color,
    fontSize: attach.fontSize ?? base.fontSize,
    message: attach.message ?? base.message,
  };
};

const sleep = (waitTime: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

const main = async () => {
  while (true) {
    await sleep(10 * 1000);

    if (!form.power) continue;

    const commandQueue = form.queue.Pop();
    const commandStack = form.stack.Pop();

    if (commandQueue)
      form.nowQueue = AttachCommand(form.nowQueue, commandQueue);
    if (commandStack)
      form.nowStack = AttachCommand(form.nowStack, commandStack);
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
    <label class="toggle-label">{{ power }}</label>
    <div class="toggle-border">
      <input id="one" type="checkbox" v-model="form.power" />
      <label for="one">
        <div class="handle"></div>
      </label>
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
  text-align: -webkit-center;
}

.operation-wrapper {
  display: flex;
  margin: 100px 0;
  justify-content: center;
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

/* From uiverse.io */
.toggle-border {
  width: 60px;
  border: 2px solid #f0ebeb;
  border-radius: 130px;
  margin-bottom: 45px;
  padding: 1px 2px;
  background: linear-gradient(to bottom right, white, rgba(220, 220, 220, 0.5)),
    white;
  box-shadow: 0 0 0 2px #fbfbfb;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.toggle-border:last-child {
  margin-bottom: 0;
}

.toggle-border input[type="checkbox"] {
  display: none;
}

.toggle-border label {
  position: relative;
  display: inline-block;
  width: 65px;
  height: 20px;
  background: #d13613;
  border-radius: 80px;
  cursor: pointer;
  box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.3);
  transition: background 0.5s;
}

.toggle-border input[type="checkbox"]:checked + label {
  background: #13d162;
}

.handle {
  position: absolute;
  top: -8px;
  left: -10px;
  width: 35px;
  height: 35px;
  border: 1px solid #e5e5e5;
  background: repeating-radial-gradient(
      circle at 50% 50%,
      rgba(200, 200, 200, 0.2) 0%,
      rgba(200, 200, 200, 0.2) 2%,
      transparent 2%,
      transparent 3%,
      rgba(200, 200, 200, 0.2) 3%,
      transparent 3%
    ),
    conic-gradient(
      white 0%,
      silver 10%,
      white 35%,
      silver 45%,
      white 60%,
      silver 70%,
      white 80%,
      silver 95%,
      white 100%
    );
  border-radius: 50%;
  box-shadow: 3px 5px 10px 0 rgba(0, 0, 0, 0.4);
  transition: left 0.4s;
}

.toggle-border input[type="checkbox"]:checked + label > .handle {
  left: calc(100% - 35px + 10px);
}

.toggle-label {
  font-size: 24px;
}
</style>
