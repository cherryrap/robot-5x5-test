<img width="428" alt="Screenshot 2023-03-15 at 12 48 10" src="https://user-images.githubusercontent.com/47773728/225210493-41a6ab27-8de3-45e4-bd2b-d8056bb5ba95.png">


1. DRY

I tried to keep it as dry as possible. Keeping Button, Input, functions, constants and state within App.js as modular as possible.

The only exception was Input (which may seem ginormous). I used an already available Input, that I previously wrote myself for 2 reasons: 1) speed / lack of time, 2) to show that I'm flexible with state managements and approaches (not only hooks - App.js, but also simple functional components - Button and class components - Input). I can also write using HOCs (recompose).

2. scss / css choice

I chose scss (sass) for the primary reason - speed and I like modifiers. But I can also write in plain css and using styled-components. I believe styled-components could have also worked well here as we have dynamic change of css properties + modifiers are easily replaced with props to styled-components (style constant). 

Some may believe that BEM is outdated. I used it (quickest with it) because the code base that I work with day-to-day and company's major projects are written using it. 

3. visualisation

I chose to make it simple, quick and flexible up to 370px screen width. 
I stand out by expertise in UX/UI, hence the choice of managing errors and edge cases by the use of Input fields, disabling buttons, normalization, validation, etc...

Also, after you check the App, I want to add a dynamic change of AXIS_MAX using the input-slider, which would allow a dynamical change of validation gap and cell quantity on the table. I believe that feature would make my App better & fun. I've laid some hay for that.

4. react / js 

As mentioned in the assignment, I chose a preferable react.js framework and decided to download a few libs for speed and neat Dx (lodash, react-number-format).

Validation of the input fields is managed by a separate extra helper/function. Normalisation of the inputted value is managed by capabilities of react-number-format (not negative integer). I intentionally don't validate a select and have a prefilled value in place. 

Each button corresponds to each separate command. Message highlights what command was put through and what were the changed values. The "disable" functionality allows for the absence of errors. To "discard all commands until a valid place() is pushed" the buttons are disabled until the first place() was executed.

left + right commands in code are combined to rotate function for the sake of Dx, DRY and less code.

The values (0, 90, 270..) are separated from labels (north, east,...) intentionally. 



In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



