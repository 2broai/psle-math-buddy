# Life Skills & Values — authoring guide

"What would you do?" situation cards for a child aged 5–9 (K2 → P3) who goes to school in
Singapore and speaks Vietnamese at home. The child reads a short situation (it is also read
aloud), taps one of 2–4 choices, and gets a kind explanation for **that** choice. A wrong
choice is explained, then the child tries again. After the best choice, a one-line lesson is shown.

Unlike the maths generators, these cards are **hand-written**. Quality matters more than
quantity: every card must be true, kind, age-appropriate and useful in real life.

Files: one file per world (`kind.js`, `feelings.js`, `school.js`, `safe.js`, `sos.js`, `road.js`,
`healthy.js`, `citizen.js`, `online.js`), each `export const TOPICS = [ ... ]`.
Worlds, values and emergency numbers live in `meta.js`. Check your work with:

```
node tests/validate-life.mjs --world=safe          # one world
node tests/validate-life.mjs --world=safe --show   # print every card (EN + VI, SG + VN numbers)
node tests/validate-life.mjs                        # everything
```

## Format

```js
export const TOPICS = [
  {
    id: 'life.lost',                 // 'life.' + short slug, unique across all worlds
    world: 'safe',                   // a world id from meta.js
    icon: '🧭',
    title: 'If I get lost',          // English, shown to the child (≤ 28 chars)
    vi: 'Khi con bị lạc',            // Vietnamese title (parent area + Vietnamese mode)
    goal: 'Con biết đứng yên một chỗ và nhờ đúng người giúp khi bị lạc.', // VI, one sentence, for parents
    talk: [                          // 2–4 open questions for parents to discuss at home (VI)
      'Nếu con bị lạc trong siêu thị, con sẽ tìm ai để nhờ giúp?',
      'Con có nhớ số điện thoại của bố hoặc mẹ không? Đọc thử cho bố mẹ nghe nhé.'
    ],
    scenarios: [
      {
        id: 'lost-mall',             // unique across ALL worlds (prefix with the topic slug)
        tier: 1,                     // 1 = clear-cut (K2), 2 = needs a little thinking (P1–P2), 3 = tricky / two good-looking options (P2–P3)
        scene: '🏬🧒❓',              // 2–4 emoji (fallback when there is no picture)
        pic: { bg: 'mall', cast: [{ e: '🧒', you: true, think: '❓' }], props: ['🛍️'] }, // see "Picture" below
        // optional: region: 'SG' | 'VN'  — only for cards that make sense in one country (hawker centre, xe máy…)
        // optional: value: 'respect' | 'responsibility' | 'resilience' | 'integrity' | 'care' | 'harmony'
        q: {
          en: "You are at the shopping mall. You turn around and can't see Mummy. What should you do?",
          vi: 'Con đang ở trung tâm thương mại. Con quay lại thì không thấy mẹ đâu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Stay near where you are and ask a shop worker at the counter for help',
            vi: 'Đứng gần chỗ đó và nhờ cô chú nhân viên ở quầy giúp',
            v: 'best',
            why: {
              en: 'Staying close makes it easy for Mummy to find you, and shop workers know how to help.',
              vi: 'Ở gần chỗ cũ giúp mẹ dễ tìm con, và nhân viên cửa hàng biết cách giúp con.'
            }
          },
          {
            e: '🚗',
            en: 'Go out to the car park to look for Mummy',
            vi: 'Đi ra bãi đỗ xe để tìm mẹ',
            v: 'no',
            why: {
              en: 'The car park is big and has moving cars. Mummy will look for you inside first.',
              vi: 'Bãi đỗ xe rất rộng và có xe chạy. Mẹ sẽ tìm con ở bên trong trước.'
            }
          },
          {
            e: '🍭',
            en: 'Go with a man who says he knows where Mummy is',
            vi: 'Đi theo một chú nói rằng chú biết mẹ con ở đâu',
            v: 'no',
            why: {
              en: 'Never go anywhere with someone you don\'t know. You choose the helper — a shop worker or a mummy with kids.',
              vi: 'Không bao giờ đi theo người con không quen. Con hãy tự chọn người để nhờ: nhân viên cửa hàng hoặc một cô đang dẫn con nhỏ.'
            }
          }
        ],
        lesson: {
          en: 'Lost? Stay close, then ask a safe helper: a shop worker at the counter, a security guard, or a mummy with kids.',
          vi: 'Bị lạc? Đứng gần chỗ cũ, rồi nhờ người an toàn: nhân viên ở quầy, chú bảo vệ, hoặc một cô đang dẫn con nhỏ.'
        }
      }
    ]
  }
];
```

`v` (verdict) for each choice:
- `'best'` — exactly **one** per card.
- `'ok'` — not wrong, but there is a better choice (at most one per card). The child is told
  "Good thinking — but there is an even better choice" and tries again.
- `'no'` — unsafe / unkind / unhelpful.

Placeholders (use them identically in `en` and `vi`):
- `{name}`, `{friend}` — two different children's names picked at random (Ali, Mei Ling, Ravi…).
  Names can be a boy or a girl: **never use a gendered pronoun for them** (no he/she/his/her;
  in Vietnamese no "cậu ấy / cô ấy / anh ấy / chị ấy" — "bạn" or "bạn ấy" is fine).
  Repeat the name or say "your friend" / "bạn".
- `{POLICE}`, `{FIRE}`, `{AMBULANCE}` — emergency numbers, filled from the family's country
  (Singapore 999 / 995 / 995, Vietnam 113 / 114 / 115). **Never write an emergency number
  directly** — the validator rejects 999, 995, 113, 114, 115, 112, 911.

## Picture (`pic`) — required on every card

A 6-year-old cannot picture a situation from words alone, so every card has an illustration:
a drawn backdrop with figures standing in it, speech / thought bubbles and a "You / Con" tag.
Rendered by `js/ui/visuals/scene.js`; preview every backdrop at `tests/scenes.html`.

  pic: {
    bg: 'mall',                         // backdrop id from the list below (required)
    cast: [                             // 1–4 figures, left → right (required)
      { e: '🧒', you: true, think: '❓' },
      { e: '👨', say: { en: 'Your mummy sent me!', vi: 'Mẹ cháu nhờ chú đón!' } }
    ],
    props: ['🍭']                       // optional, 0–3 small objects scattered in the scene
  }

  Cast item fields:
  - e: one emoji (a person, animal or big object).
  - you: true marks the child the card talks to ("You"). Use it in nearly every card. Prefer 🧒 for "you" unless another child emoji fits better.
  - say: { en, vi } is a speech bubble of at most 40 characters each. Use it for what someone SAYS in the story. It helps a lot with tricky people, friends, teachers and online messages.
  - think: 1–2 emoji in a thought bubble (❓ 😟 💭🍦 …).
  - flip: true mirrors the emoji so it faces the other way (e.g. a car driving left).
  - size: 's' | 'm' | 'l'. The default is 'm'. Use 'l' for grown-ups or big things like a car, and 's' for small animals or a ball.
  - x: 5–95, optional, the horizontal position in %. By default figures are spread evenly.
  - up: 0–50, optional. Lifts the figure off the floor in %, e.g. a cat in a tree or a child climbing near a window.
  - screen: true places the figure INSIDE the device screen. Use it only with bg 'tablet', e.g. the stranger chatting online or a pop-up ad.

  The picture must show the SITUATION, before any choice is made. Don't draw the answer.

  Backdrop ids:
  - home: living room
  - kitchen: stove, pans
  - bedroom: bed, night window
  - bathroom: sink, toilet, soap
  - door: front door of a flat, inside view
  - window: high-rise window or balcony with city view
  - classroom: whiteboard, desks
  - canteen: school canteen stalls and tables
  - schoolyard: school field at recess
  - schoolgate: school gate and pick-up point
  - playground: slide and swings
  - park: trees, grass, path
  - street: pavement with shops
  - road: zebra crossing, traffic light, cars
  - carpark: parked cars
  - car: inside a car
  - busstop: bus stop
  - bus: inside a bus
  - mrt: MRT platform with yellow line and train
  - lift: lift lobby with doors and buttons
  - escalator: escalator in a building
  - mall: shopping mall shop fronts
  - supermarket: shelves and trolley
  - hawker: hawker centre tables (SG)
  - library: bookshelves
  - clinic: doctor's room
  - party: balloons and cake
  - pool: swimming pool
  - beach: sand and sea
  - storm: outside, dark clouds, rain, lightning
  - tablet: child with a big tablet or phone screen; use screen:true cast for what's on it
  - fire: room with smoke
  - voiddeck: HDB void deck (SG)

  Pick the closest backdrop. If none fits, use 'home' or 'street' and let props and cast tell the story.

## Tone of explanations

The app prints the verdict before each `why`: "🌟 Great choice!" (best), "🙂 Good thinking — but
there is an even better choice" (ok), "✋ Hmm, not the best idea" (no). So **don't start a `why`
with "Yes!", "Correct", "Đúng rồi", "No", "Not safe"…** — start with the reason.

## How to write a good card

- **Second person** ("You are…", "Con đang…"). Warm, simple words a 6-year-old hears every day.
  Short: prompt ≤ 30 words, choice ≤ 15 words, why ≤ 30 words, lesson ≤ 30 words.
  Hard limits (validator): prompt 220 chars, choice 100, why 200, lesson 200.
- **Real situations** a 5–9 year-old meets: home, HDB lift and void deck, playground, MRT, bus,
  hawker centre, supermarket, condo pool, school canteen, recess, classroom, birthday party,
  grandparents' house, the iPad.
- **Plausible wrong choices** — what a child might really do (hide, run, cry, keep quiet, take it,
  hit back, tell a fib). No silly options ("eat the fire").
- **Kind explanations.** Never shame or scare. Explain what happens and how others feel:
  "Your friend might feel left out." "Hot oil can burn your skin." Not "That is bad!"
- **No graphic or frightening detail.** No death, kidnapping, blood, monsters. "Tricky people",
  "unsafe", "could get hurt" are enough.
- **Accurate.** Follow the safety facts below. If you are not sure a fact is current official
  advice, leave the card out.
- **Mix tiers** in every topic: about 40 % tier 1, 40 % tier 2, 20 % tier 3.
- **Vary the best choice's position** — choices are shuffled at runtime, but don't always make
  the best one the longest or the only sensible-sounding one.
- Singapore English words are welcome (Mummy, Daddy, Auntie, Uncle, recess, canteen, void deck,
  HDB, MRT, hawker centre). Mark cards that only make sense in one country with `region`.
- **Vietnamese**: natural, warm, gender-neutral where possible. Address the child as **"con"**,
  parents as "bố/mẹ" (or "bố mẹ"), teachers "thầy cô", grown-ups "người lớn con tin tưởng".
  Translate the meaning, not word by word. Keep placeholders.
- Each topic: 5–8 cards. Each world: 4–5 topics, at least 24 cards.

## Safety facts (use these; don't invent rules)

**Getting lost**: stay where you are / nearby; ask a safe helper — a shop worker behind the counter,
security guard, police officer, or a mother with children; never leave the place (no car park,
no going outside); know a parent's phone number; never go off with someone who approaches you.

**Tricky people** (not "stranger danger" — most strangers are kind, and tricky people can be
people you know): grown-ups don't need help from kids (a grown-up asking a child for help finding
a puppy is a warning sign); **always check first** with your grown-up before going anywhere,
getting into a car, or taking a gift/sweets; it's OK to say NO loudly and run to a safe adult;
a family code word can be used.

**Body safety**: your body belongs to you; private parts are the parts covered by your swimsuit;
nobody should touch them or ask you to touch theirs or take pictures — except a doctor or nurse
checking you with your parent there, or a parent helping you wash when you are little;
**No – Go – Tell**: say no, get away, tell a grown-up you trust, and keep telling until someone
helps; surprises (a birthday present) are happy and get told soon; secrets that make you feel
worried must be told; it is never the child's fault. Keep wording gentle and matter-of-fact.

**Home**: don't open the door to anyone without asking your grown-up; don't climb on window
ledges, balcony railings or furniture near windows; medicine is not sweets — only take medicine
from a parent/grown-up; don't touch cleaning products, lighters, matches, plugs and sockets;
keep water away from plugs; stay away from the stove, kettle, iron and hot pans; walk with
scissors pointing down.

**Fire**: get out, stay out — don't stop for toys or to hide (never hide under a bed or in a
cupboard); crawl low under smoke; feel a closed door with the back of your hand — if hot, use
another way; use the stairs, never the lift; if your clothes catch fire: **Stop, Drop and Roll**
(cover your face); tell a grown-up / call {FIRE}; once out, never go back in.

**Calling for help**: call {POLICE} for police, {FIRE} for fire, {AMBULANCE} for an ambulance;
say your name, where you are (address), what happened; answer questions and don't hang up until
told; never call emergency numbers for fun or as a joke.

**First aid (child level)**: small cut → tell a grown-up, wash with clean water, plaster; burn →
cool it under cool running water for a long time (about 20 minutes), no ice, no butter or
toothpaste, tell a grown-up; nosebleed → sit, lean **forward**, pinch the soft part of the nose;
someone can't breathe / is choking / won't wake up → get a grown-up fast, call {AMBULANCE};
bumped head and feel sleepy or sick → tell a grown-up right away; allergies → never share
food with a friend who has an allergy.

**Water**: only swim with a grown-up watching; walk, don't run, by the pool; if someone is in
trouble in the water, don't jump in — shout for a grown-up and throw something that floats
(reach or throw, don't go); if you fall in: stay calm and float on your back like a starfish.

**Weather / nature**: lightning or thunder → go indoors, not under a tree, get out of the pool;
hot day → drink water, hat, play in the shade, rest if dizzy; haze → stay indoors, tell a grown-up
if breathing feels hard; mosquitoes → no standing water (Singapore: dengue); dogs → ask the owner
before patting, don't touch stray dogs or cats, if a dog chases you stand still "like a tree"
and don't run; bees → walk away calmly, don't swat.

**Road / transport**: cross with a grown-up and hold hands; cross at the green man / zebra
crossing / overhead bridge; stop at the kerb, look both ways and keep looking while you cross;
don't run out after a ball; wear your seat belt / sit in your booster seat every trip, even short
ones; get in and out of the car on the pavement side; never play in car parks or behind a car;
stand behind the yellow line at the MRT/bus stop; let people out of the train first; escalator:
stand still facing forward, hold the handrail, keep feet inside the yellow lines, mind loose
shoelaces and clothes, no running or sitting; lift: don't put hands or toys in the doors; if the
lift gets stuck, press the alarm bell and wait calmly; helmet when cycling/scootering
(Vietnam: always a helmet on a motorbike).

**Health**: wash hands with soap for 20 seconds (before eating, after the toilet, after
playing outside, after sneezing); cough or sneeze into your elbow or a tissue; brush teeth twice
a day; drink water; eat fruit and vegetables, fewer sweets and sugary drinks; sleep early
(children need about 10–11 hours); move and play outside every day; take breaks from screens;
tell a grown-up when you feel unwell.

**Online**: never share your full name, address, school, phone number, passwords or photos
without asking your grown-up; people online may not be who they say they are; if something is
scary, rude or makes you feel funny — stop, close it, tell a grown-up (it's not your fault);
ask before downloading apps, clicking ads or buying anything in a game; be kind online; screen
time ends when the timer ends.

## Values (Singapore CCE — R3ICH)

Tag values cards with `value`: respect, responsibility, resilience, integrity, care, harmony.
Good themes: honesty (found money, broke something, cheating in a game), sharing and taking turns,
including someone who is left out, standing up for a friend, saying sorry and making it right,
thank you / please, greeting elders, listening to others, helping at home (chores), keeping
promises, losing a game gracefully, trying again after a mistake, respecting different races,
religions, foods and languages (Racial Harmony Day), caring for the environment (litter,
recycling, saving water and electricity), public manners (queueing, quiet in the library,
priority seats on the MRT, returning trays at the hawker centre), being kind to animals.
