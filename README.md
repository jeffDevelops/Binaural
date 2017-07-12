# Binaural
Binaural is an aural skills teaching tool for anyone wishing to hone their music theory skills. Being able to accurately and quickly identify intervals is a critical skill for the live musician. It allows you to adjust your tuning on-the-fly, and if you want to improvise with other musicians, identifying intervallic relationships in and between chords is critical to your success in sounding, well... good.

## Wireframe
![Image of Binaural Wireframe]
(https://github.com/jeffDevelops/Binaural/blob/master/Screen%20Shot%202017-07-10%20at%209.56.55%20PM.png?raw=true)

## App Overview
Gameplay for this project will be simple: two players will compete for sixty seconds to guess as many aural intervallic relationships (played with audio snippets) as possible, and the player that correctly identifies more wins.

If this ends up not consuming all of my time this week, adding a harder game mode by sounding off simultaneous intervals, rather than one-note-after-the-other could be an additional feature. Further enhancements could include sounding off different kinds of triads, and then seventh chords, and then ninths, and then elevenths, added 2nds and 6ths, identifying scale/mode types, developing relative pitch... so many features, so little time! 

While this project is centered around identifying a winner out of multiple players, the primary foreseeable use-case for this app will probably be more of a self-study tool. A solo, time-trial version of the game, in which the player tries to best herself after each iteration, is probably more of the direction the app should go, and could be explored at a later time.

## Technologies Proposal
As a culmination of our unit on client-side rendering at GA, everything will be constructed on the front-end. For now. The componentized design elements that will be passed between the players during gameplay screams React to me, but that'll be for another time. For now, I'll componentize by grouping class names; this way, when it's time to switch players and move the game UI to the other half of the screen we can just grab large chunks of DOM all at once. Call me naive because I don't actually have a clue about the actual performance expenses of loading the entire jQuery library, but I'm going to pretend like performance is critical. Plus, I'd like some more practice with raw JavaScript DOM API in case jQuery is viewed with as much disdain as the trolls of Stack Overflow in future occupational environments. Something I'm floored to take a look at are these partial libraries Zeb was talking about. Maybe I can find a Bootstrap or Foundation just-the-grid library to expedite layout without the other thousands of lines of CSS, and who knows? Maybe that'll save me some time to dive into CSS Grid for the users whose browsers that support that.

## Intervals Cheat Sheet

For my instructors, who may want some context to be able to play my game if they have no musical background:

Only unisons, fourths, fifths, and octaves can be perfect, because you can't make them major or minor. Lowering these intervals by half-step diminishes them, and the inverse augments them.

All other intervals may be major or minor. Minor intervals lowered by half step make them dininished. Major intervals raised by half step are augmented.

Does the interval sound happy? It's probably major! Does it sound sad? It's probably minor. Is it completely jarring? It's probably an diminished fifth/augmented fourth (which are enharmonically equivalent intervals, btw!). Is it dreamy? It's probably a major seventh.

The list below shows the most common name of each interval first. My game will require allowing any enharmonic equivalent to pass as correct, but you're going to get weird looks from musicians if you call a unison a diminished 2nd...

* Perfect Unison/Augmented 7th/diminished 2nd: you can't get this wrong. It's the same exact note.

* minor 2nd/Augmented Unison: Jaws is swimming after you.

* Major 2nd/diminished 3rd: the first two repeating notes of the Safari Zone/evolution music of *Pokemon* Red, Blue, and Yellow version

* minor 3rd/Augmented 2nd: a doorbell; the first interval of "nanna-nanna-boo-boo" or "Ring Around The Rosy"--anything creepy kids in horror movies sing

* Major 3rd/diminished 4th: first interval of "Kumbayah" or "Oh, When the Saints Go Marching In"

* Perfect 4th: first interval of "O Christmas Tree," "Here Comes the Bride," or [the Universal Pictures production credit.](https://www.youtube.com/watch?v=DOWbvYYzAzQ)

* Tritone/Augmented 4th/diminished 5th (you actually won't get weird looks interchanging any of these interval names): first interval of *The Simpsons* theme-song, or "Maria" from *West Side Story*. Fun fact: this interval was banned in sacred music for almost a thousand years because its jarring sound was associated with Satan.

* Perfect 5th: first interval of the Strauss tone poem *Also Sprach Zarathustra*, more commonly known as the opening music to *2001: A Space Odyssey*. [A beautiful rendition of that.](https://www.youtube.com/watch?v=wpFQLw5_N2o) Also, the first interval of the *Star Wars* main theme.

* minor 6th/Augmented 5th: if you can find a better one, let me know... the interval between "God" and "was" in "What if God Was One of Us?"

* Major 6th: first interval of "My Bonnie Lies Over the Ocean"

* minor 7th/Augmented 6th: 

* Major 7th/diminished unison: first interval of "Take On Me" by a-ha

* Perfect Octave/Augmented 7th/diminished 9th (for the love of God, don't call it that unless it's written that way): If you can't just tell that it's the same note but an octave above, the first interval of "Somewhere Over the Rainbow" should do the trick.

[One last opening credits fail.](https://www.youtube.com/watch?v=Yp_LQDn0W04)

Agile Summary
Working together
Welcome changing requirements
Sustainable development practices



