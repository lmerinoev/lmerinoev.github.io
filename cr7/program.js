// The program: seven chapters, one per stop on the road from Funchal, plus a
// recovery session for any day. Each move is { n: name, c: cue, a: anim,
// q: quiet-mode swap name, qa: quiet-mode anim }.

const M = (n, c, a, q, qa) => ({ n, c, a, q: q || null, qa: qa || null });

const WARMUP = {
  kind: 'flow', title: 'Warm-up', work: 35, moves: [
    M('March in place', 'Big arm swings, easy breathing', 'march'),
    M('Arm circles', 'Forward 15s, then backward', 'armcircles'),
    M('Hip circles', 'Hands on hips, both directions', 'hipcircles'),
    M('Good mornings', 'Hinge at the hips, flat back', 'goodmorning'),
    M('Half squats', 'Smooth and springy', 'squat'),
    M('Torso twists', 'Loose arms, let them whip', 'torsotwist'),
    M('Easy jacks', 'Light bounce, warm the calves', 'jack', 'Step-out jacks', 'sidestep'),
  ]
};

const COOLDOWN = {
  kind: 'flow', title: 'Cool-down', work: 40, moves: [
    M('Standing quad stretch', 'Hold the wall, swap halfway', 'quadstretch'),
    M('Forward fold', 'Soft knees, hang heavy', 'forwardfold'),
    M('Hip flexor lunge stretch', 'Swap sides halfway, squeeze the glute', 'hipflexorstretch'),
    M('Chest opener', 'Hands behind back, lift the chest', 'chestopener'),
    M('Child’s pose', 'Long arms, slow breaths out', 'childpose'),
  ]
};

const BENCHMARK = (note) => ({
  kind: 'bench', title: 'Benchmark', note,
  moves: [
    M('Max air squats', 'Full depth, count every rep', 'squat'),
    M('Max push-ups', 'Knees are fine — just count', 'pushup'),
    M('Max burpees', 'Steady rhythm beats sprinting', 'burpee', 'Walk-out burpees, no jump'),
  ]
});

export const BENCH_FIELDS = [['squats', 'Squats'], ['pushups', 'Push-ups'], ['burpees', 'Burpees']];

export const CHAPTERS = [
  {
    id: 'c1', num: '01', place: 'Funchal', year: '1985', title: 'Origins', tag: 'benchmark + full body',
    story: 'Born on Madeira, raised in Santo António. A small house, a big family, a ball in the street until dark.',
    focus: 'Find out exactly where you are today. Write it down. Then a full-body session to set the standard.',
    quote: 'work', doneQuote: 'better',
    blocks: [
      WARMUP,
      BENCHMARK('Count every rep. Log the numbers after — chapter 07 is the rematch.'),
      { kind: 'hiit', title: 'Full-body standard', work: 40, rest: 20, rounds: 2, breather: 60, moves: [
        M('Air squats', 'Chest proud, heels down', 'squat'),
        M('Push-ups', 'Elbows ~45°, knees anytime', 'pushup'),
        M('Mountain climbers', 'Hips low, drive the knees', 'climber'),
        M('Reverse lunges', 'Alternate legs, soft landing', 'reverselunge'),
        M('Plank shoulder taps', 'Hips quiet, feet wide', 'planktap'),
        M('Jumping jacks', 'Full arm swing overhead', 'jack', 'Step-out jacks', 'sidestep'),
      ]},
      COOLDOWN,
    ]
  },
  {
    id: 'c2', num: '02', place: 'Lisboa', year: '1997', title: 'Hunger', tag: 'speed + engine',
    story: 'Twelve years old, alone on a plane to Lisbon for Sporting’s academy. Homesick, and faster than everyone.',
    focus: 'Pure engine work. Sprint, recover, sprint again. This is your indoor run.',
    quote: 'dreams', doneQuote: 'nothing-to-prove',
    blocks: [
      WARMUP,
      { kind: 'hiit', title: 'Sprint work', work: 40, rest: 20, rounds: 3, breather: 60, moves: [
        M('High knees', 'Tall chest, quick feet', 'highknees', 'Power march', 'march'),
        M('Skaters', 'Push side to side, stick the landing', 'skater', 'Side taps', 'sidestep'),
        M('Shadow boxing', 'Fast hands, stay on your toes', 'shadowbox'),
        M('Mountain climbers', 'Even pace, breathe', 'climber'),
        M('Fast feet', 'Low stance, sprint the feet', 'fastfeet', 'Quick march', 'march'),
        M('Squat to punch', 'Squat, stand, jab-cross', 'squatpunch'),
      ]},
      { kind: 'hiit', title: 'Final four minutes', work: 20, rest: 10, rounds: 4, breather: 0, moves: [
        M('Jumping jacks', 'Empty the tank', 'jack', 'Step-out jacks', 'sidestep'),
      ]},
      COOLDOWN,
    ]
  },
  {
    id: 'c3', num: '03', place: 'Manchester', year: '2003', title: 'The Seven', tag: 'legs + power',
    story: 'Eighteen, handed the number seven at Old Trafford. Skinny when he arrived. Built himself into a different athlete.',
    focus: 'Legs that last ninety minutes. Strength-endurance for the lower half.',
    quote: 'nothing-to-prove', doneQuote: 'work',
    blocks: [
      WARMUP,
      { kind: 'hiit', title: 'Leg strength', work: 45, rest: 15, rounds: 2, breather: 60, moves: [
        M('Air squats', 'Slow down, control up', 'squat'),
        M('Alternating reverse lunges', 'Knee to the floor', 'reverselunge'),
        M('Glute bridges', 'Squeeze hard at the top', 'glutebridge'),
        M('Side lunges — left', 'Sit back into the hip', 'sidelunge'),
        M('Side lunges — right', 'Chest up, push off strong', 'sidelunge'),
        M('Wall sit', 'Thighs parallel, hands off legs', 'wallsit'),
        M('Calf raises', 'Pause up top, full stretch down', 'calfraise'),
        M('Squat pulses', 'Stay low, small bounces', 'squatpulse'),
      ]},
      { kind: 'hiit', title: 'The wall', work: 60, rest: 0, rounds: 1, breather: 0, moves: [
        M('Wall sit', 'One minute. Don’t touch your legs.', 'wallsit'),
      ]},
      COOLDOWN,
    ]
  },
  {
    id: 'c4', num: '04', place: 'Madrid', year: '2009', title: 'The Machine', tag: 'pyramid',
    story: 'Nine seasons at the Bernabéu. Goals at a rate the game had never seen, season after season after season.',
    focus: 'Climb up, climb down. Four moves, five levels — intervals that grow then shrink.',
    quote: 'best', doneQuote: 'love-hate',
    blocks: [
      WARMUP,
      { kind: 'pyramid', title: 'Pyramid', steps: [[20, 10], [30, 15], [40, 20], [30, 15], [20, 10]], breather: 45, moves: [
        M('Burpees', 'Your pace, never stop moving', 'burpee', 'Walk-out burpees, no jump'),
        M('Squat jumps', 'Explode up, land soft', 'squatjump', 'Squat + calf raise', 'calfraise'),
        M('Push-ups', 'Quality over speed', 'pushup'),
        M('Mountain climbers', 'Finish every level strong', 'climber'),
      ]},
      COOLDOWN,
    ]
  },
  {
    id: 'c5', num: '05', place: 'Torino', year: '2018', title: 'Control', tag: 'push + core',
    story: 'Thirty-three and starting over in a new league, a new language. The body was the constant.',
    focus: 'Upper body and midsection. Slow reps, full control, no swinging.',
    quote: 'consistency', doneQuote: 'better',
    blocks: [
      WARMUP,
      { kind: 'hiit', title: 'Push & core', work: 40, rest: 20, rounds: 2, breather: 60, moves: [
        M('Push-ups', 'Full range, knees anytime', 'pushup'),
        M('Pike push-ups', 'Hips high, head toward floor', 'pikepushup'),
        M('Plank', 'Squeeze everything, steady breath', 'plank'),
        M('Side plank — left', 'Stack or stagger the feet', 'sideplank'),
        M('Side plank — right', 'Hips high', 'sideplank'),
        M('Supermans', 'Lift arms and legs, pause up top', 'superman'),
        M('Bicycle crunches', 'Slow, elbow to opposite knee', 'bicycle'),
        M('Hollow hold', 'Low back down — or knees tucked', 'hollowhold'),
      ]},
      { kind: 'hiit', title: 'Max push-ups', work: 60, rest: 0, rounds: 1, breather: 0, moves: [
        M('Max push-ups', 'One minute. Remember the number.', 'pushup'),
      ]},
      COOLDOWN,
    ]
  },
  {
    id: 'c6', num: '06', place: 'Riyadh', year: '2023', title: 'Longevity', tag: 'endurance',
    story: 'Thirty-seven when he landed, and still scoring years later. Proof that the habits compound.',
    focus: 'Long steady burn. Conversational pace, no stopping, three halves.',
    quote: 'age', doneQuote: 'consistency',
    blocks: [
      WARMUP,
      { kind: 'hiit', title: 'First half', work: 60, rest: 0, rounds: 1, breather: 90, moves: [
        M('March or jog in place', 'Settle into a rhythm', 'march'),
        M('Step-back lunges', 'Steady tempo, no rush', 'reverselunge'),
        M('Standing punches', 'Light feet, relaxed shoulders', 'shadowbox'),
        M('High knees — cruising', 'Comfortably hard', 'highknees', 'Brisk power march', 'march'),
        M('Air squats — steady', 'Metronome pace', 'squat'),
        M('Side steps + reach', 'Wide steps, reach overhead', 'sidestep'),
      ]},
      { kind: 'hiit', title: 'Second half', work: 60, rest: 0, rounds: 1, breather: 90, moves: [
        M('March or jog in place', 'Find the rhythm again', 'march'),
        M('Step-back lunges', 'Smooth, quiet landings', 'reverselunge'),
        M('Standing punches', 'Faster hands this half', 'shadowbox'),
        M('High knees — cruising', 'Hold the pace', 'highknees', 'Brisk power march', 'march'),
        M('Air squats — steady', 'Keep the depth honest', 'squat'),
        M('Slow mountain climbers', 'Controlled, hips level', 'climber'),
      ]},
      { kind: 'hiit', title: 'Extra time', work: 60, rest: 0, rounds: 1, breather: 0, moves: [
        M('March or jog in place', 'Last stretch', 'march'),
        M('Step-back lunges', 'Strong to the end', 'reverselunge'),
        M('Standing punches', 'Finish sharp', 'shadowbox'),
        M('High knees — cruising', 'One more gear', 'highknees', 'Brisk power march', 'march'),
        M('Air squats — steady', 'Every rep full depth', 'squat'),
        M('Fast feet', 'Empty the tank — 60 seconds', 'fastfeet', 'Quick march', 'march'),
      ]},
      COOLDOWN,
    ]
  },
  {
    id: 'c7', num: '07', place: 'Seleção', year: '2016', title: 'The Final', tag: 'retest + finish', retest: 'c1',
    story: 'Paris, Euro 2016. Injured and off in the first half of the final — then on the touchline, driving the team to the trophy.',
    focus: 'The rematch. Same benchmark as chapter 01. Beat your numbers, then finish like it’s a final.',
    quote: 'never-give-up', doneQuote: 'siu',
    blocks: [
      WARMUP,
      BENCHMARK('Same three tests as chapter 01. Your old numbers are on the board below — go past them.'),
      { kind: 'hiit', title: 'The final', work: 40, rest: 20, rounds: 1, breather: 0, moves: [
        M('Jumping jacks', 'Pick the tempo up', 'jack', 'Step-out jacks', 'sidestep'),
        M('Air squats', 'Compare these to chapter 01', 'squat'),
        M('Push-ups', 'Stronger than a week ago', 'pushup'),
        M('Skaters', 'Push hard side to side', 'skater', 'Side taps', 'sidestep'),
        M('Plank shoulder taps', 'Solid now', 'planktap'),
        M('High knees', 'Sprint to the line', 'highknees', 'Power march', 'march'),
        M('The celebration', 'Jump, turn, land wide. Say it.', 'siu', 'The stance — no jump', 'stance'),
      ]},
      COOLDOWN,
    ]
  },
];

export const RECOVERY = {
  id: 'rec', num: 'R', extra: true, place: 'Any day', year: 'Rest', title: 'Recovery', tag: 'mobility + light core',
  story: 'He has called recovery and sleep as important as training. This session is how you earn tomorrow.',
  focus: 'Loosen up, light core, then go for a long walk. No intensity today.',
  quote: 'sleep', doneQuote: 'sleep',
  blocks: [
    { kind: 'flow', title: 'Mobility', work: 45, moves: [
      M('Cat-cow', 'Move with your breath', 'catcow'),
      M('World’s greatest stretch — L', 'Lunge, twist, reach up', 'worldsgreatest'),
      M('World’s greatest stretch — R', 'Slow is the point', 'worldsgreatest'),
      M('Hip flexor stretch — L', 'Tuck the pelvis, lean gently', 'hipflexorstretch'),
      M('Hip flexor stretch — R', 'Breathe into it', 'hipflexorstretch'),
      M('Hamstring fold', 'Hinge, soft knees, hang', 'forwardfold'),
      M('Figure-4 stretch — L', 'On your back, pull the leg in', 'figure4'),
      M('Figure-4 stretch — R', 'Relax the shoulders', 'figure4'),
      M('Thoracic rotations', 'On all fours, open the chest', 'thoracicrot'),
      M('Child’s pose', 'Longest exhales of the day', 'childpose'),
    ]},
    { kind: 'hiit', title: 'Light core', work: 30, rest: 15, rounds: 2, breather: 45, moves: [
      M('Dead bugs', 'Low back glued to the floor', 'deadbug'),
      M('Bird dogs', 'Long lines, no wobble', 'birddog'),
      M('Glute bridges', 'Smooth reps, squeeze up top', 'glutebridge'),
      M('Side plank — left', 'Knees down is fine', 'sideplank'),
      M('Side plank — right', 'Straight line', 'sideplank'),
    ]},
    COOLDOWN,
  ]
};

// ---------- expand a session into timed player steps ----------
export const moveName = (m, quiet) => (quiet && m.q) ? m.q : m.n;
export const moveAnim = (m, quiet) => (quiet && m.qa) ? m.qa : m.a;

export function buildSteps(s, quiet) {
  const steps = [];
  const push = (kind, label, secs, cue, anim) => steps.push({ kind, label, secs, cue, anim });
  push('prep', 'Get ready', 10, s.title, 'stance');

  for (const b of s.blocks) {
    if (b.kind === 'flow') {
      b.moves.forEach(m => push('flow', moveName(m, quiet), b.work, m.c, moveAnim(m, quiet)));
    } else if (b.kind === 'bench') {
      b.moves.forEach((m, i) => {
        push('work', moveName(m, quiet), 60, m.c, moveAnim(m, quiet));
        if (i < b.moves.length - 1) push('rest', 'Recover', 90, 'Note your count. Shake it out.', 'idle');
      });
    } else if (b.kind === 'hiit') {
      for (let r = 0; r < b.rounds; r++) {
        b.moves.forEach((m, i) => {
          push('work', moveName(m, quiet), b.work, m.c, moveAnim(m, quiet));
          const last = i === b.moves.length - 1;
          if (!last && b.rest > 0) push('rest', 'Recover', b.rest, 'Next: ' + moveName(b.moves[i + 1], quiet), 'idle');
          if (last && r < b.rounds - 1) {
            if (b.rest > 0) push('rest', 'Recover', b.rest, 'Round ' + (r + 2) + ' next', 'idle');
            if (b.breather > 0) push('rest', 'Water', b.breather, 'Round ' + (r + 2) + ' of ' + b.rounds, 'idle');
          }
        });
      }
      if (b.breather > 0 && b.rounds === 1) push('rest', 'Water', b.breather, 'Reset before the next block', 'idle');
    } else if (b.kind === 'pyramid') {
      b.steps.forEach(([w, rst], r) => {
        b.moves.forEach((m, i) => {
          push('work', moveName(m, quiet), w, m.c + ' · level ' + (r + 1) + '/' + b.steps.length, moveAnim(m, quiet));
          const last = i === b.moves.length - 1;
          if (!last) push('rest', 'Recover', rst, 'Next: ' + moveName(b.moves[i + 1], quiet), 'idle');
          if (last && r < b.steps.length - 1) push('rest', 'Water', b.breather, 'Level ' + (r + 2) + ': ' + b.steps[r + 1][0] + 's work', 'idle');
        });
      });
    }
  }
  return steps;
}

export const sessionMinutes = (s) => Math.round(buildSteps(s, false).reduce((t, x) => t + x.secs, 0) / 60);
