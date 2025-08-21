const MyThingStatus = {
  Done: '✓',
  InProgress: '~',
  NotDone: '✗',
} as const

type MyThingStatus = (typeof MyThingStatus)[keyof typeof MyThingStatus]

type MyThing = {
  title: string
  status: MyThingStatus
}

export const list100: MyThing[] = [
  {
    title: 'Visit Utah, Idaho, and Arizona, and reconnect with old friends in the US',
    status: MyThingStatus.NotDone,
  },
  {
    title: 'Spend a whole week doing nothing but eating, sleeping, and studying the Scriptures.',
    status: MyThingStatus.NotDone,
  },
  { title: 'Reach advanced proficiency in English', status: MyThingStatus.InProgress },
  { title: 'Learn Chinese', status: MyThingStatus.NotDone },
  { title: "Live in another country – I'm currently living in Japan", status: MyThingStatus.Done },

  { title: 'Run a full marathon', status: MyThingStatus.NotDone },
  { title: 'Travel to 50 countries', status: MyThingStatus.NotDone },
  { title: 'Get married and have at least two children', status: MyThingStatus.NotDone },
  { title: 'Earn a Master of Business Administration (MBA)', status: MyThingStatus.NotDone },
  { title: 'Earn a Master of Science (MSc)', status: MyThingStatus.NotDone },
  { title: 'Launch my own software product used by over a million users', status: '✗' },
  { title: 'Earn a PhD', status: MyThingStatus.NotDone },
  { title: 'Be awesome', status: MyThingStatus.InProgress },
  {
    title: 'Help others selflessly, without expecting anything in return',
    status: MyThingStatus.InProgress,
  },
  { title: 'Be kind and compassionate', status: MyThingStatus.InProgress },
  { title: 'Be a speaker at an international conference', status: MyThingStatus.NotDone },
  { title: 'Get hired by a FAANG or other top tech company', status: MyThingStatus.NotDone },
]

export const updatedDateAt = new Date('2025-08-21')
