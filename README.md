counter.js
==========

A very simple voting counter jQuery plugin. [DEMO's here](http://yangmann.github.io/counter.js/ "Counter.js DEMO").

> IMPORTANT NOTICE:

> Temporarily counter.js will use [Metro-UI-CSS](https://github.com/olton/Metro-UI-CSS "Metro UI CSS")'s 
feature for elegent color definitions like `bg-color-*`.

> And you need to place the class name for color definition exactly 2nd in the outer-wrap of counter.

> e.g. `<div class="some-class bg-color-green some-other-class" data-role="counter">`
or `<div class="counter bg-color-greenLight some-other-class">`

> Plus, this will be revised soon.

##Controls

123456789 or mouse click to add votes for candidate 1 ~ 9.

QWERTYUIO to cancel vote for 123456789, one vote at a time.

(QWERTYUIO lies right below 123456789 on standard keyboards.)


##Markups

Each vote-counter's HTML markup should look like this:

    <div data-role="counter">
      <span class="digit">0</span>
      <!-- <div class="badge">
        // some clickable elements
      </div> -->
    </div>

Both `class="counter"` and `data-role="counter"` can trigger vote-counter's outer-wrap.

An inner-wrap with `class="digit"` is essential, which contains the initial toll of this counter.

The `class="badge"` inner-wrap is optional. When added, it will provide a clickable button to add votes.

##data-APIs

All `data-*` attributes specified for this plugin need to be exactly in the same tag with 
`data-role="counter"` or `class="counter"`.

###data-role="counter"

e.g. `<div data-role="counter">`

It tells the plugin to render this block of markups as a vote-counter.

###data-maxToll

e.g. `<div data-role="counter" data-maxToll="250">`

Specifies the maximum toll of this vote-counter. Default number is `150`.
> NOTICE: If exceeds, digit will still increase but mask will stop growing taller.

###data-tollMask

e.g. `<div data-role="counter" data-tollMask="inverse">`

Taking two options: `normal` or `inverse`, it will determine the counter's background or the mask to be colorful.
Default option is `normal`, means the counter's background is colored while the toll mask is color-lighten.
