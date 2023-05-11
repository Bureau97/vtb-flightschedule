---
layout: page.11ty.cjs
title: <vtb-flightschedule> ⌲ Home
---

# &lt;vtb-flightschedule>

`<vtb-flightschedule>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<vtb-flightschedule>` is just an HTML element. You can it anywhere you can use HTML!

```html
<vtb-flightschedule></vtb-flightschedule>
```

  </div>
  <div>

<vtb-flightschedule></vtb-flightschedule>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<vtb-flightschedule>` can be configured with attributed in plain HTML.

```html
<vtb-flightschedule name="HTML"></vtb-flightschedule>
```

  </div>
  <div>

<vtb-flightschedule name="HTML"></vtb-flightschedule>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<vtb-flightschedule>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import { html, render } from "lit-html";

const name = "lit-html";

render(
  html`
    <h2>This is a &lt;vtb-flightschedule&gt;</h2>
    <vtb-flightschedule .name=${name}></vtb-flightschedule>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;vtb-flightschedule&gt;</h2>
<vtb-flightschedule name="lit-html"></vtb-flightschedule>

  </div>
</section>
