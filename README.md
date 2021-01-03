Check out a live version of this site [here](https://tomate.netlify.app/).

# Pomodoro Timer

This timer was build using **`React`** and **`Redux`**

Some of its features:

## Segmented LCD display-inspired

The page emulates the look of a segmented LCD screen just like the ones on digital pocket watches.

This has some limitations:

- Every segment that can be lit up can also be faintly seen when turned off.
- You can't put two elements on top of each other. Even if an element is turned off it still occupies its space on the screen.

These informed a lot of the design decisions. For example, since it's not supposed to be a touchscreen, you can't directly click on the elements, instead, you use the buttons below the display.

## Local Save States

The app uses redux-persist to keep the state. It even keeps running while it closed (or it pretends to) by checking the stored timestamp for when the timer was started

## Dynamic title tag.

So you can see the current time without having to open the window.

## Smart main button

You can interact with the app by just pressing the main button.

It starts the timer, or it pauses it, or it goes to the next timer when the current is done, or silences the alarm.

## Keyboard shortcuts

- Space => Main button
- P => Start pomodoro
- L => Start long rest
- S => Start short rest
