// World: sos — see README.md in this folder for the format.
// Accuracy-critical: every rule follows current child-safety / first-aid guidance
// (SCDF, Singapore Red Cross, St John, NFPA, WHO, Royal Life Saving, NEA, PUB).
// A child's best action is almost always "get a grown-up / call for help", not adult first aid.
export const TOPICS = [
  // ───────────────────────────────────────────────────────────── 1. FIRE
  {
    id: 'life.fire-safety',
    world: 'sos',
    icon: '🔥',
    title: 'Fire safety',
    vi: 'An toàn khi có cháy',
    goal: 'Con biết thoát ra thật nhanh khi có cháy, bò thấp dưới khói, đi cầu thang bộ, biết “Dừng lại – Nằm xuống – Lăn” và đã ra ngoài thì không quay vào.',
    talk: [
      'Nhà mình có những lối ra nào? Nếu có cháy, cả nhà sẽ gặp nhau ở chỗ nào bên ngoài?',
      'Vì sao khi có khói con phải cúi thấp và bò sát sàn?',
      'Mình cùng tập “Dừng lại – Nằm xuống – Lấy tay che mặt – Lăn” ngay trên sàn nhà nhé.',
      'Nếu con chợt nhớ đồ chơi hay thú cưng còn ở trong nhà, con sẽ làm gì?'
    ],
    scenarios: [
      {
        id: 'fire-get-out',
        tier: 1,
        scene: '🔔🔥🏃',
        pic: {
          bg: 'fire',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '👨', size: 'l', say: { en: 'Fire! Everybody out!', vi: 'Cháy rồi! Mọi người ra ngoài!' } }
          ],
          props: ['🔔', '🧸']
        },
        q: {
          en: "The smoke alarm is beeping loudly and Daddy shouts, 'Fire! Everybody out!' What do you do?",
          vi: "Máy báo khói kêu inh ỏi và bố hét lên: 'Cháy rồi! Mọi người ra ngoài!' Con làm gì?"
        },
        choices: [
          {
            e: '🏃',
            en: 'Go out with Daddy straight away',
            vi: 'Đi ra ngoài cùng bố ngay lập tức',
            v: 'best',
            why: {
              en: 'When there is a fire, get out fast and stay out. Don’t stop for anything.',
              vi: 'Khi có cháy, con ra ngoài thật nhanh và ở luôn bên ngoài. Không dừng lại vì bất cứ thứ gì.'
            }
          },
          {
            e: '🛏️',
            en: "Hide under your bed until it's over",
            vi: 'Trốn dưới gầm giường cho tới khi hết cháy',
            v: 'no',
            why: {
              en: 'Hiding can feel safe, but smoke gets in everywhere and firefighters may not find you. Always get out.',
              vi: 'Trốn có vẻ an toàn, nhưng khói lan vào khắp nơi và các chú lính cứu hoả khó tìm thấy con. Luôn thoát ra ngoài nhé.'
            }
          },
          {
            e: '🎒',
            en: 'Pack your toys and school bag first',
            vi: 'Xếp đồ chơi và cặp sách vào trước đã',
            v: 'no',
            why: {
              en: "Things can be bought again, but there's only one you! Leave everything and get out.",
              vi: 'Đồ đạc có thể mua lại, còn con thì chỉ có một thôi! Bỏ lại hết và ra ngoài nhé.'
            }
          }
        ],
        lesson: {
          en: 'Fire? Get out fast and stay out. Never hide, and never stop for your things.',
          vi: 'Có cháy? Thoát ra thật nhanh và ở luôn bên ngoài. Không trốn, không dừng lại lấy đồ.'
        }
      },
      {
        id: 'fire-crawl-low',
        tier: 1,
        scene: '💨🧒🚪',
        pic: {
          bg: 'fire',
          cast: [{ e: '🧒', you: true, think: '😟' }],
          props: ['🚪']
        },
        q: {
          en: 'There is a fire. Grey smoke is filling the room as you head for the door. How should you go?',
          vi: 'Có cháy. Khói xám đang tràn vào phòng khi con đi ra cửa. Con nên đi thế nào?'
        },
        choices: [
          {
            e: '🐢',
            en: 'Get down low and crawl to the door',
            vi: 'Cúi thấp người và bò ra cửa',
            v: 'best',
            why: {
              en: 'Smoke rises up high, so the cleaner air is near the floor. Get low and go!',
              vi: 'Khói bốc lên cao, nên không khí sạch hơn nằm sát sàn nhà. Cúi thấp và bò ra!'
            }
          },
          {
            e: '🏃',
            en: 'Stand up tall and run as fast as you can',
            vi: 'Đứng thẳng người và chạy thật nhanh',
            v: 'no',
            why: {
              en: 'Smoke floats up high, so standing tall means breathing in more smoke. Get down low instead.',
              vi: 'Khói bay lên cao, nên đứng thẳng thì con sẽ hít nhiều khói hơn. Hãy cúi thấp xuống.'
            }
          },
          {
            e: '🙈',
            en: 'Close your eyes and stay where you are',
            vi: 'Nhắm mắt lại và đứng yên một chỗ',
            v: 'no',
            why: {
              en: 'Staying still keeps you in the smoke. Get low and keep moving towards the way out.',
              vi: 'Đứng yên thì con vẫn ở trong khói. Hãy cúi thấp và tiếp tục bò về phía lối ra.'
            }
          }
        ],
        lesson: {
          en: 'In smoke, get low and go! The cleaner air is down near the floor.',
          vi: 'Khi có khói, cúi thấp và bò ra! Không khí sạch hơn ở sát sàn nhà.'
        }
      },
      {
        id: 'fire-school-alarm',
        tier: 1,
        scene: '🏫🔔🚶',
        value: 'responsibility',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '👩‍🏫', size: 'l', say: { en: 'Leave your things and line up!', vi: 'Các con để đồ lại, xếp hàng!' } },
            { e: '🧒', you: true, think: '❓' }
          ],
          props: ['🔔', '🎒']
        },
        q: {
          en: "The fire alarm rings during class. Your teacher says, 'Leave your things and line up!' What do you do?",
          vi: "Chuông báo cháy reo trong giờ học. Cô giáo nói: 'Các con để đồ lại và xếp hàng!' Con làm gì?"
        },
        choices: [
          {
            e: '🚶',
            en: 'Leave your things and walk out quietly with your class',
            vi: 'Để đồ lại và cùng cả lớp đi ra trật tự',
            v: 'best',
            why: {
              en: 'Walking quietly lets you hear your teacher, and staying with your class helps your teacher check everyone is out.',
              vi: 'Đi trật tự giúp con nghe rõ lời cô, và đi cùng lớp giúp cô biết chắc mọi bạn đều đã ra ngoài.'
            }
          },
          {
            e: '🎒',
            en: 'Quickly pack your bag first',
            vi: 'Nhanh tay xếp cặp sách trước đã',
            v: 'no',
            why: {
              en: 'Your bag can stay behind. Getting out quickly with your class is what matters.',
              vi: 'Cặp sách cứ để lại. Điều quan trọng là ra ngoài thật nhanh cùng cả lớp.'
            }
          },
          {
            e: '💨',
            en: 'Run ahead to be the first one out',
            vi: 'Chạy lên trước để ra ngoài đầu tiên',
            v: 'no',
            why: {
              en: 'Running and pushing can make people trip and fall. Walk quickly and stay with your class.',
              vi: 'Chạy và chen lấn có thể làm các bạn vấp ngã. Đi nhanh nhưng không chạy, và ở cùng lớp nhé.'
            }
          }
        ],
        lesson: {
          en: 'Fire alarm at school? Leave your things, stay with your class and walk out quietly. Listen to your teacher.',
          vi: 'Chuông báo cháy ở trường? Để đồ lại, ở cùng lớp và đi ra trật tự. Nghe theo lời thầy cô.'
        }
      },
      {
        id: 'fire-stairs-not-lift',
        tier: 2,
        scene: '🏬🔔🚶',
        pic: {
          bg: 'mall',
          cast: [
            { e: '👩', size: 'l' },
            { e: '🧒', you: true, think: '❓' }
          ],
          props: ['🔔']
        },
        q: {
          en: 'The fire alarm rings at the shopping mall. You and Mummy are on the 4th floor. How do you get out?',
          vi: 'Chuông báo cháy reo ở trung tâm thương mại. Con và mẹ đang ở tầng 4. Con ra ngoài bằng cách nào?'
        },
        choices: [
          {
            e: '🚶',
            en: 'Follow the EXIT signs to the stairs with Mummy',
            vi: "Cùng mẹ đi theo biển 'Lối thoát' xuống cầu thang bộ",
            v: 'best',
            why: {
              en: 'EXIT signs show the safe way out. In a fire, always use the stairs, and hold Mummy’s hand.',
              vi: "Biển 'Lối thoát' chỉ đường ra an toàn. Khi có cháy, luôn đi cầu thang bộ và nắm tay mẹ."
            }
          },
          {
            e: '🛗',
            en: "Take the lift — it's faster",
            vi: 'Đi thang máy cho nhanh',
            v: 'no',
            why: {
              en: 'In a fire, a lift can stop between floors or fill with smoke. Always take the stairs.',
              vi: 'Khi có cháy, thang máy có thể dừng giữa chừng hoặc bị khói lùa vào. Luôn đi cầu thang bộ.'
            }
          },
          {
            e: '🏃',
            en: 'Run down the stairs ahead of Mummy',
            vi: 'Chạy xuống cầu thang trước, bỏ mẹ lại sau',
            v: 'no',
            why: {
              en: "Stay together so you don't get lost in the crowd. Walk quickly with Mummy and hold the handrail.",
              vi: 'Ở cùng nhau để con không bị lạc giữa đám đông. Đi nhanh cùng mẹ và vịn tay vịn cầu thang.'
            }
          }
        ],
        lesson: {
          en: 'In a fire, use the stairs — never the lift. Follow the EXIT signs with your grown-up.',
          vi: "Khi có cháy, đi cầu thang bộ — không bao giờ đi thang máy. Cùng người lớn đi theo biển 'Lối thoát'."
        }
      },
      {
        id: 'fire-stop-drop-roll',
        tier: 2,
        scene: '🎂👕🛑',
        pic: {
          bg: 'party',
          cast: [{ e: '🧒', you: true, think: '😱' }],
          props: ['🎂', '🔥']
        },
        q: {
          en: 'At a party, your sleeve touches a birthday candle and catches fire! What should you do?',
          vi: 'Ở tiệc sinh nhật, tay áo con chạm vào ngọn nến và bắt lửa! Con nên làm gì?'
        },
        choices: [
          {
            e: '🛑',
            en: 'Stop, drop to the floor, cover your face and roll',
            vi: 'Dừng lại, nằm xuống sàn, lấy tay che mặt và lăn',
            v: 'best',
            why: {
              en: 'Rolling puts the flames out, and your hands keep your face safe. Then a grown-up can cool the burn with water.',
              vi: 'Lăn qua lăn lại sẽ dập tắt lửa, còn tay che giữ an toàn cho mặt con. Sau đó người lớn sẽ xả nước mát lên chỗ bỏng.'
            }
          },
          {
            e: '🏃',
            en: 'Run to find Mummy',
            vi: 'Chạy đi tìm mẹ',
            v: 'no',
            why: {
              en: 'Running fans the flames and makes them bigger. Stop, drop and roll right where you are.',
              vi: 'Chạy làm gió thổi vào lửa và lửa to hơn. Hãy dừng lại, nằm xuống và lăn ngay tại chỗ.'
            }
          },
          {
            e: '👋',
            en: 'Wave your arm fast to blow the fire out',
            vi: 'Vẫy tay thật mạnh cho lửa tắt',
            v: 'no',
            why: {
              en: 'Waving gives the fire more air and makes it bigger. Stop, drop and roll instead.',
              vi: 'Vẫy tay làm lửa có thêm không khí và cháy to hơn. Hãy dừng lại, nằm xuống và lăn.'
            }
          }
        ],
        lesson: {
          en: 'Clothes on fire? Stop, Drop and Roll — and cover your face with your hands.',
          vi: 'Quần áo bắt lửa? Dừng lại – Nằm xuống – Lăn, và lấy tay che mặt.'
        }
      },
      {
        id: 'fire-feel-door',
        tier: 2,
        scene: '🚪✋💨',
        pic: {
          bg: 'fire',
          cast: [{ e: '🧒', you: true, think: '❓' }],
          props: ['🚪']
        },
        q: {
          en: 'There is smoke in the house. To get out, you must go through a closed door. What do you do first?',
          vi: 'Trong nhà có khói. Để ra ngoài, con phải đi qua một cánh cửa đang đóng. Con làm gì trước tiên?'
        },
        choices: [
          {
            e: '✋',
            en: 'Feel the door with the back of your hand',
            vi: 'Áp mu bàn tay lên cửa xem có nóng không',
            v: 'best',
            why: {
              en: 'Cool door? Open it slowly and go. Hot door? Fire may be behind it — keep it shut and use another way.',
              vi: 'Cửa mát? Mở từ từ rồi đi. Cửa nóng? Có thể lửa ở phía sau — để cửa đóng và đi lối khác.'
            }
          },
          {
            e: '🚪',
            en: 'Fling the door open and run through',
            vi: 'Mở toang cửa và chạy qua',
            v: 'no',
            why: {
              en: 'If fire is behind the door, heat and smoke can rush in. Always feel the door first.',
              vi: 'Nếu lửa ở sau cửa, hơi nóng và khói sẽ ùa vào. Luôn sờ cửa trước khi mở.'
            }
          },
          {
            e: '🖐️',
            en: "Grab the metal door handle to see if it's hot",
            vi: 'Nắm chặt tay nắm cửa bằng kim loại xem có nóng không',
            v: 'no',
            why: {
              en: 'A metal handle can get very hot and hurt your palm. Test with the back of your hand first.',
              vi: 'Tay nắm kim loại có thể rất nóng và làm bỏng lòng bàn tay. Hãy thử bằng mu bàn tay trước.'
            }
          }
        ],
        lesson: {
          en: 'In a fire, feel a closed door with the back of your hand. Hot? Keep it shut and find another way out.',
          vi: 'Khi có cháy, sờ cửa đóng bằng mu bàn tay. Nóng? Để cửa đóng và tìm lối ra khác.'
        }
      },
      {
        id: 'fire-pan-on-fire',
        tier: 3,
        scene: '🍳🔥🙋',
        pic: {
          bg: 'kitchen',
          cast: [{ e: '🧒', you: true, think: '😟' }],
          props: ['🍳', '🔥']
        },
        q: {
          en: 'You walk into the kitchen. The oil in a pan on the stove is on fire, and no grown-up is there. What do you do?',
          vi: 'Con đi vào bếp. Dầu trong chảo trên bếp đang bốc cháy, và không có người lớn ở đó. Con làm gì?'
        },
        choices: [
          {
            e: '📣',
            en: 'Get out of the kitchen and shout for a grown-up',
            vi: 'Ra khỏi bếp và gọi to người lớn',
            v: 'best',
            why: {
              en: 'Get away from the fire and get a grown-up fast. If the fire grows, everyone gets out and calls {FIRE}.',
              vi: 'Tránh xa đám cháy và gọi người lớn thật nhanh. Nếu lửa lan to, cả nhà ra ngoài và gọi {FIRE}.'
            }
          },
          {
            e: '💧',
            en: 'Throw a cup of water on it',
            vi: 'Hắt một cốc nước vào chảo',
            v: 'no',
            why: {
              en: 'Never put water on an oil fire! Water makes the burning oil jump out, and the fire gets bigger.',
              vi: 'Không bao giờ dùng nước dập lửa chảo dầu! Nước làm dầu đang cháy bắn tung ra và lửa bùng to hơn.'
            }
          },
          {
            e: '🧤',
            en: 'Carry the pan to the sink',
            vi: 'Bưng chảo ra bồn rửa',
            v: 'no',
            why: {
              en: 'The pan is very hot and the burning oil could spill on you. Leave it and get a grown-up.',
              vi: 'Chảo rất nóng và dầu đang cháy có thể đổ vào người con. Để nguyên đó và đi gọi người lớn.'
            }
          }
        ],
        lesson: {
          en: 'A pan on fire? Never use water. Get out of the kitchen and get a grown-up fast.',
          vi: 'Chảo dầu bốc cháy? Không bao giờ dùng nước. Ra khỏi bếp và gọi người lớn thật nhanh.'
        }
      },
      {
        id: 'fire-stay-out-pet',
        tier: 3,
        scene: '🏠🐱🧑‍🚒',
        pic: {
          bg: 'street',
          cast: [
            { e: '👨', size: 'l' },
            { e: '🧒', you: true, think: '🐱' },
            { e: '🧑‍🚒', size: 'l' }
          ],
          props: ['🚒']
        },
        q: {
          en: 'Your family got out of a fire and is at your meeting place. Then you remember your cat is still inside! What do you do?',
          vi: 'Cả nhà đã thoát khỏi đám cháy và đang ở chỗ hẹn. Rồi con chợt nhớ chú mèo vẫn còn ở trong nhà! Con làm gì?'
        },
        choices: [
          {
            e: '🧑‍🚒',
            en: 'Stay outside and tell a firefighter the cat is inside',
            vi: 'Ở ngoài và báo cho chú lính cứu hoả biết mèo còn trong nhà',
            v: 'best',
            why: {
              en: 'Firefighters have special suits and masks so they can go in safely. Your job is to stay outside.',
              vi: 'Các chú lính cứu hoả có quần áo và mặt nạ đặc biệt để vào trong an toàn. Việc của con là ở bên ngoài.'
            }
          },
          {
            e: '🏃',
            en: 'Run back in quickly — you know where the cat hides',
            vi: 'Chạy nhanh vào nhà — con biết mèo hay trốn ở đâu',
            v: 'no',
            why: {
              en: 'You love your cat, but going back in is not safe, even for a moment. Once you are out, stay out.',
              vi: 'Con thương mèo lắm, nhưng quay vào nhà rất nguy hiểm, dù chỉ một chút thôi. Đã ra ngoài thì ở ngoài.'
            }
          },
          {
            e: '🙏',
            en: 'Ask Daddy to run back in for the cat',
            vi: 'Nhờ bố chạy vào nhà bế mèo ra',
            v: 'no',
            why: {
              en: "Daddy loves the cat too, but it isn't safe for grown-ups to go back in either. Firefighters are the right helpers.",
              vi: 'Bố cũng thương mèo, nhưng người lớn quay vào cũng không an toàn. Lính cứu hoả mới là người giúp được.'
            }
          }
        ],
        lesson: {
          en: "Once you're out, stay out — even for pets or toys. Wait at your meeting place and tell the firefighters.",
          vi: 'Đã ra ngoài thì ở ngoài — kể cả vì thú cưng hay đồ chơi. Đợi ở chỗ hẹn và báo cho lính cứu hoả.'
        }
      }
    ]
  },

  // ───────────────────────────────────────────────────────────── 2. CALLING FOR HELP
  {
    id: 'life.call-for-help',
    world: 'sos',
    icon: '📞',
    title: 'Calling for help',
    vi: 'Gọi giúp đỡ khẩn cấp',
    goal: 'Con biết khi nào cần gọi số khẩn cấp, gọi số nào, nói gì, giữ máy đến khi được dặn, và không bao giờ gọi để đùa.',
    talk: [
      'Con có nhớ số gọi cứu hoả, cấp cứu và cảnh sát ở nơi mình sống không? Mình cùng đọc to nhé.',
      'Con thử nói như khi gọi cấp cứu: tên con, địa chỉ nhà mình, và chuyện gì đã xảy ra.',
      'Bố mẹ chỉ con cách bấm gọi khẩn cấp trên điện thoại đang khoá nhé — chỉ tập thử, không bấm gọi thật.',
      'Khi có người lớn ở gần, con nên gọi người lớn hay tự gọi số khẩn cấp trước? Vì sao?'
    ],
    scenarios: [
      {
        id: 'call-which-number',
        tier: 1,
        scene: '🔥📞🚒',
        pic: {
          bg: 'street',
          cast: [
            { e: '👵' },
            { e: '👨', size: 'l', say: { en: 'Please call the fire engine!', vi: 'Con gọi xe cứu hoả giúp bố!' } },
            { e: '🧒', you: true, think: '📞' }
          ],
          props: ['🏠', '💨']
        },
        q: {
          en: "Everyone is safely out of a fire at home. Daddy says, 'Please call the fire engine while I help Grandma!' Which number?",
          vi: "Cả nhà đã thoát khỏi đám cháy an toàn. Bố nói: 'Con gọi xe cứu hoả giúp bố, bố đỡ bà nhé!' Con gọi số nào?"
        },
        choices: [
          {
            e: '🚒',
            en: 'Call {FIRE} for the fire engine',
            vi: 'Gọi {FIRE} để xe cứu hoả đến',
            v: 'best',
            why: {
              en: '{FIRE} sends firefighters and fire engines to help.',
              vi: 'Gọi {FIRE} thì các chú lính cứu hoả và xe cứu hoả sẽ đến giúp.'
            }
          },
          {
            e: '🚓',
            en: 'Call {POLICE} for the police',
            vi: 'Gọi {POLICE} để báo cảnh sát',
            v: 'ok',
            why: {
              en: 'The police will help too, but {FIRE} is the quickest way to get a fire engine.',
              vi: 'Cảnh sát cũng sẽ giúp, nhưng gọi {FIRE} là cách nhanh nhất để có xe cứu hoả.'
            }
          },
          {
            e: '📱',
            en: 'Call Mummy at work first',
            vi: 'Gọi cho mẹ ở chỗ làm trước',
            v: 'no',
            why: {
              en: "Mummy will want to know, but Mummy can't send a fire engine. Call {FIRE} first, then Mummy.",
              vi: 'Mẹ sẽ muốn biết, nhưng mẹ không gọi xe cứu hoả đến ngay được. Gọi {FIRE} trước, rồi gọi mẹ sau.'
            }
          }
        ],
        lesson: {
          en: 'Fire: {FIRE}. Ambulance: {AMBULANCE}. Police: {POLICE}. Learn them by heart!',
          vi: 'Cứu hoả: {FIRE}. Cấp cứu: {AMBULANCE}. Cảnh sát: {POLICE}. Con nhớ thuộc lòng nhé!'
        }
      },
      {
        id: 'call-never-for-fun',
        tier: 1,
        scene: '😜📞🚫',
        value: 'responsibility',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '🧒', say: { en: "Let's call {POLICE} for fun!", vi: 'Mình gọi {POLICE} cho vui đi!' } }
          ],
          props: ['📱']
        },
        q: {
          en: "{friend} picks up the phone and says, 'Let's call {POLICE} for fun and see what happens!' What do you do?",
          vi: "{friend} cầm điện thoại lên và nói: 'Mình gọi {POLICE} cho vui xem sao!' Con làm gì?"
        },
        choices: [
          {
            e: '🙅',
            en: 'Say no — those numbers are only for real emergencies',
            vi: 'Nói không — số đó chỉ dành cho lúc thật sự khẩn cấp',
            v: 'best',
            why: {
              en: 'While helpers answer a joke call, someone who really needs help might have to wait.',
              vi: 'Trong lúc các cô chú trả lời cuộc gọi đùa, một người đang thật sự cần giúp có thể phải chờ.'
            }
          },
          {
            e: '😂',
            en: "Call, then hang up quickly — it's only a joke",
            vi: 'Gọi rồi cúp máy thật nhanh — chỉ đùa thôi mà',
            v: 'no',
            why: {
              en: 'Emergency helpers take every call seriously, even very short ones. A joke call takes time away from people who need help.',
              vi: 'Các cô chú trực tổng đài coi mọi cuộc gọi là thật, kể cả cuộc gọi rất ngắn. Gọi đùa làm mất thời gian của người đang cần giúp.'
            }
          },
          {
            e: '👀',
            en: 'Let {friend} call while you watch',
            vi: 'Để {friend} gọi, còn con đứng xem',
            v: 'no',
            why: {
              en: 'Watching is still joining in. Kindly tell {friend} to stop, and tell a grown-up if {friend} keeps trying.',
              vi: 'Đứng xem cũng là cùng tham gia rồi. Con nhẹ nhàng bảo {friend} dừng lại, và báo người lớn nếu bạn vẫn cố gọi.'
            }
          }
        ],
        lesson: {
          en: 'Emergency numbers are only for real emergencies — never for fun or a joke.',
          vi: 'Số khẩn cấp chỉ dùng khi thật sự khẩn cấp — không bao giờ gọi để đùa.'
        }
      },
      {
        id: 'call-what-to-say',
        tier: 2,
        scene: '📞🗣️🏠',
        pic: {
          bg: 'home',
          cast: [
            { e: '👴', think: '🤒' },
            { e: '🧒', you: true, think: '❓' },
            { e: '📱', size: 's', say: { en: 'What is your emergency?', vi: 'Có chuyện gì khẩn cấp vậy?' } }
          ]
        },
        q: {
          en: "Grandpa is very sick, so you call {AMBULANCE}. A calm voice asks, 'What is your emergency?' What do you say?",
          vi: "Ông đang mệt rất nặng nên con gọi {AMBULANCE}. Một giọng nói bình tĩnh hỏi: 'Có chuyện gì khẩn cấp vậy?' Con nói gì?"
        },
        choices: [
          {
            e: '🏠',
            en: 'Your name, your home address, and that Grandpa is very sick',
            vi: 'Tên con, địa chỉ nhà, và ông đang mệt rất nặng',
            v: 'best',
            why: {
              en: 'Who you are, where you are and what happened help the ambulance find you fast.',
              vi: 'Con là ai, con ở đâu và chuyện gì xảy ra sẽ giúp xe cấp cứu tìm đến nhanh.'
            }
          },
          {
            e: '🙋',
            en: "'Grandpa is sick, come quickly!'",
            vi: "'Ông bị mệt, đến nhanh lên!'",
            v: 'ok',
            why: {
              en: 'Telling them about Grandpa is important. They also need your name and address so the ambulance knows where to go.',
              vi: 'Nói ông bị mệt là rất cần. Các cô chú còn cần tên con và địa chỉ nhà để xe cấp cứu biết đường đến.'
            }
          },
          {
            e: '🤐',
            en: "'Help!' — then wait quietly for the ambulance",
            vi: "'Cứu với!' — rồi im lặng đợi xe cấp cứu",
            v: 'no',
            why: {
              en: "The helpers don't know where you live yet! Tell them your address and what happened, and answer their questions.",
              vi: 'Các cô chú chưa biết nhà con ở đâu! Hãy nói địa chỉ, kể chuyện gì xảy ra và trả lời câu hỏi nhé.'
            }
          }
        ],
        lesson: {
          en: 'On an emergency call, say who you are, where you are, and what happened. Learn your address by heart!',
          vi: 'Khi gọi khẩn cấp, hãy nói con là ai, con ở đâu, và chuyện gì đã xảy ra. Nhớ thuộc lòng địa chỉ nhà nhé!'
        }
      },
      {
        id: 'call-stay-on-line',
        tier: 2,
        scene: '📞⏳🙂',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '📱', size: 's', say: { en: 'Can you tell me more?', vi: 'Con kể thêm cho cô nhé?' } }
          ]
        },
        q: {
          en: 'You called {AMBULANCE}. The helper on the phone keeps asking questions, and you feel nervous. What do you do?',
          vi: 'Con đã gọi {AMBULANCE}. Cô chú trực tổng đài cứ hỏi con nhiều câu, và con thấy hồi hộp. Con làm gì?'
        },
        choices: [
          {
            e: '☎️',
            en: 'Answer slowly and stay on the phone until they say you can hang up',
            vi: 'Trả lời từ từ và giữ máy cho tới khi được dặn cúp máy',
            v: 'best',
            why: {
              en: "Your answers help them send the right help. It's OK to say 'I don't know'.",
              vi: "Con trả lời giúp các cô chú biết cần gửi ai đến giúp. Nói 'Con không biết' cũng được."
            }
          },
          {
            e: '📴',
            en: 'Hang up because the questions are hard',
            vi: 'Cúp máy vì câu hỏi khó quá',
            v: 'no',
            why: {
              en: "If you hang up, they may not know where to go. Stay on the line — 'I don't know' is a fine answer.",
              vi: "Nếu con cúp máy, các cô chú có thể không biết phải đến đâu. Cứ giữ máy — nói 'Con không biết' cũng được."
            }
          },
          {
            e: '🤫',
            en: 'Stay quiet and just wait for the ambulance',
            vi: 'Im lặng và chỉ chờ xe cấp cứu',
            v: 'no',
            why: {
              en: 'The helper is kind and wants to help you. When you talk to them, the right help comes faster.',
              vi: 'Cô chú trực máy rất hiền và muốn giúp con. Con trả lời thì người đến giúp sẽ tới nhanh hơn.'
            }
          }
        ],
        lesson: {
          en: "Stay on the phone and answer the questions. It's OK to say 'I don't know'. Hang up only when they tell you.",
          vi: "Giữ máy và trả lời các câu hỏi. Nói 'Con không biết' cũng không sao. Chỉ cúp máy khi được dặn."
        }
      },
      {
        id: 'call-wont-wake-up',
        tier: 2,
        scene: '👵💤📞',
        pic: {
          bg: 'home',
          cast: [
            { e: '👵', think: '💤' },
            { e: '🧒', you: true, say: { en: 'Grandma! Wake up!', vi: 'Bà ơi! Bà ơi!' } }
          ],
          props: ['📱']
        },
        q: {
          en: 'You are at home with Grandma. Grandma falls down and won’t wake up, even when you call loudly. What do you do?',
          vi: 'Con ở nhà với bà. Bà bị ngã và không tỉnh lại, dù con gọi rất to. Con làm gì?'
        },
        choices: [
          {
            e: '📞',
            en: 'Call {AMBULANCE} right away',
            vi: 'Gọi {AMBULANCE} ngay lập tức',
            v: 'best',
            why: {
              en: "Say Grandma won't wake up and give your address. The helper will tell you what to do next.",
              vi: 'Nói là bà không tỉnh và cho biết địa chỉ nhà. Cô chú trực máy sẽ hướng dẫn con làm gì tiếp.'
            }
          },
          {
            e: '🛋️',
            en: 'Try to lift Grandma onto the sofa',
            vi: 'Cố đỡ bà lên ghế sô-pha',
            v: 'no',
            why: {
              en: 'Grandma is heavy, and moving someone who has fallen can hurt them more. Call {AMBULANCE} instead.',
              vi: 'Bà nặng lắm, và di chuyển người bị ngã có thể làm họ đau thêm. Con hãy gọi {AMBULANCE}.'
            }
          },
          {
            e: '📺',
            en: 'Let Grandma sleep and wait for Mummy to come home',
            vi: 'Để bà ngủ và đợi mẹ về',
            v: 'no',
            why: {
              en: 'Not waking up is different from sleeping. Grandma needs help now, so call {AMBULANCE}.',
              vi: 'Không tỉnh lại khác với đang ngủ. Bà cần được giúp ngay, con hãy gọi {AMBULANCE}.'
            }
          }
        ],
        lesson: {
          en: 'If someone falls and won’t wake up, call {AMBULANCE} at once — or run to a neighbour for help.',
          vi: 'Nếu ai đó ngã và không tỉnh lại, gọi {AMBULANCE} ngay — hoặc chạy sang nhờ hàng xóm giúp.'
        }
      },
      {
        id: 'call-grown-up-first',
        tier: 3,
        scene: '🛝🤕🙋',
        value: 'care',
        pic: {
          bg: 'playground',
          cast: [
            { e: '🧒', you: true, think: '❓' },
            { e: '🧒', think: '😣' },
            { e: '👩', size: 'l', x: 86 }
          ]
        },
        q: {
          en: "{friend} falls off the climbing frame and can't get up. A grown-up is sitting nearby. What do you do first?",
          vi: '{friend} ngã từ khung leo trèo xuống và không đứng dậy được. Có một người lớn đang ngồi gần đó. Con làm gì trước tiên?'
        },
        choices: [
          {
            e: '🏃',
            en: 'Run and tell the grown-up right away',
            vi: 'Chạy đến báo người lớn ngay',
            v: 'best',
            why: {
              en: 'A grown-up close by is the fastest help. They can look after {friend} straight away and call {AMBULANCE} if it is serious.',
              vi: 'Người lớn ở gần là sự giúp đỡ nhanh nhất. Họ chăm sóc {friend} được ngay, và gọi {AMBULANCE} nếu bạn bị nặng.'
            }
          },
          {
            e: '📞',
            en: 'Call {AMBULANCE} yourself',
            vi: 'Tự gọi {AMBULANCE}',
            v: 'ok',
            why: {
              en: 'When a grown-up is right there, get them first. They can see how badly {friend} is hurt and decide if an ambulance is needed.',
              vi: 'Khi có người lớn ngay bên cạnh, hãy gọi họ trước. Họ sẽ xem {friend} đau nặng hay nhẹ và quyết định có cần xe cấp cứu không.'
            }
          },
          {
            e: '🤝',
            en: 'Pull {friend} up to stand',
            vi: 'Kéo {friend} đứng dậy',
            v: 'no',
            why: {
              en: 'If {friend} is badly hurt, moving can make it worse. Let {friend} stay still and get a grown-up.',
              vi: 'Nếu {friend} bị đau nặng, di chuyển có thể làm đau thêm. Để bạn nằm yên và đi gọi người lớn.'
            }
          }
        ],
        lesson: {
          en: 'Someone hurt? Get the nearest grown-up first. No grown-up around? Call {AMBULANCE}.',
          vi: 'Có người bị thương? Gọi người lớn gần nhất trước. Không có người lớn? Gọi {AMBULANCE}.'
        }
      },
      {
        id: 'call-locked-phone',
        tier: 3,
        scene: '📱🔒🆘',
        pic: {
          bg: 'home',
          cast: [
            { e: '👴', think: '🤒' },
            { e: '🧒', you: true, think: '🔒' }
          ],
          props: ['📱']
        },
        q: {
          en: "Grandpa suddenly feels very unwell and needs an ambulance. His phone is locked and you don't know the passcode. What can you do?",
          vi: 'Ông đột nhiên mệt rất nặng và cần xe cấp cứu. Điện thoại của ông đang khoá và con không biết mật khẩu. Con làm gì?'
        },
        choices: [
          {
            e: '🆘',
            en: "Tap 'Emergency' on the lock screen, then call {AMBULANCE}",
            vi: "Chạm vào chữ 'Khẩn cấp' trên màn hình khoá, rồi gọi {AMBULANCE}",
            v: 'best',
            why: {
              en: 'Most phones can call emergency numbers without the passcode. Ask your grown-up to show you how.',
              vi: 'Hầu hết điện thoại đều gọi được số khẩn cấp mà không cần mật khẩu. Nhờ bố mẹ chỉ cho con cách làm nhé.'
            }
          },
          {
            e: '🚪',
            en: 'Run next door and ask a neighbour to call',
            vi: 'Chạy sang nhờ hàng xóm gọi giúp',
            v: 'ok',
            why: {
              en: "A neighbour can help! But you can call straight away yourself: tap 'Emergency' on the lock screen.",
              vi: "Hàng xóm có thể giúp! Nhưng con có thể tự gọi ngay: chạm vào 'Khẩn cấp' trên màn hình khoá."
            }
          },
          {
            e: '🔢',
            en: 'Keep guessing numbers to unlock it',
            vi: 'Cứ đoán mật khẩu cho tới khi mở được',
            v: 'no',
            why: {
              en: "Guessing takes a long time and can lock the phone for even longer. Look for 'Emergency' on the lock screen.",
              vi: "Đoán mất nhiều thời gian và có thể làm điện thoại bị khoá lâu hơn. Hãy tìm chữ 'Khẩn cấp' trên màn hình khoá."
            }
          }
        ],
        lesson: {
          en: "A locked phone can still call {AMBULANCE}: tap 'Emergency'. Ask your grown-up to show you, and only practise — don't really call.",
          vi: "Điện thoại bị khoá vẫn gọi được {AMBULANCE}: chạm vào 'Khẩn cấp'. Nhờ bố mẹ chỉ cách và chỉ tập thử thôi, đừng gọi thật."
        }
      }
    ]
  },

  // ───────────────────────────────────────────────────────────── 3. GETTING HURT
  {
    id: 'life.first-aid',
    world: 'sos',
    icon: '🩹',
    title: 'When someone gets hurt',
    vi: 'Khi bị thương',
    goal: 'Con biết sơ cứu đơn giản vừa sức (vết đứt nhỏ, bỏng, chảy máu cam, ong đốt), luôn báo người lớn, và gọi người lớn thật nhanh khi ai đó khó thở.',
    talk: [
      'Khi bị chảy máu cam, con ngồi thế nào? Vì sao không nên ngửa đầu ra sau?',
      'Nếu bị bỏng, con để chỗ bỏng dưới vòi nước mát bao lâu? Có nên chườm đá hay bôi kem đánh răng không?',
      'Trong lớp con có bạn nào bị dị ứng thức ăn không? Vì sao không nên chia đồ ăn cho bạn ấy?',
      'Khi con hoặc bạn bị đau, con sẽ báo ai trước?'
    ],
    scenarios: [
      {
        id: 'aid-small-cut',
        tier: 1,
        scene: '✂️👆🩹',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true, think: '😣' }],
          props: ['✂️', '📄']
        },
        q: {
          en: 'You cut your finger with the scissors by accident. It is bleeding a little. What should you do?',
          vi: 'Con lỡ cắt vào ngón tay khi dùng kéo. Ngón tay chảy máu một chút. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Tell a grown-up, wash it with clean water, and put on a plaster',
            vi: 'Báo người lớn, rửa bằng nước sạch rồi dán băng cá nhân',
            v: 'best',
            why: {
              en: 'Clean water washes germs away, and a plaster keeps the cut clean while it heals.',
              vi: 'Nước sạch rửa trôi vi trùng, còn băng cá nhân giữ vết đứt sạch sẽ cho mau lành.'
            }
          },
          {
            e: '🙈',
            en: "Hide it so you don't get into trouble",
            vi: 'Giấu đi để khỏi bị mắng',
            v: 'no',
            why: {
              en: "You're not in trouble! Grown-ups want to help, and a cut needs cleaning to keep germs out.",
              vi: 'Con không bị mắng đâu! Người lớn muốn giúp con, và vết đứt cần được rửa sạch để vi trùng không vào.'
            }
          },
          {
            e: '👕',
            en: 'Wipe it on your shirt and keep going',
            vi: 'Lau vào áo rồi làm tiếp',
            v: 'no',
            why: {
              en: 'Clothes can have germs on them. Wash the cut with clean water and tell a grown-up.',
              vi: 'Quần áo có thể có vi trùng. Hãy rửa vết đứt bằng nước sạch và báo người lớn.'
            }
          }
        ],
        lesson: {
          en: 'Small cut? Tell a grown-up. Wash it, press with a clean tissue until it stops, then put on a plaster.',
          vi: 'Bị đứt tay nhẹ? Báo người lớn. Rửa sạch, lấy khăn giấy sạch ấn nhẹ cho cầm máu, rồi dán băng cá nhân.'
        }
      },
      {
        id: 'aid-choking',
        tier: 1,
        scene: '🍱😮📣',
        value: 'care',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '🧒', think: '😰' }
          ],
          props: ['🍱']
        },
        q: {
          en: "At lunch, {friend} suddenly can't talk, cough or breathe, and looks scared. What do you do?",
          vi: 'Đang ăn trưa, {friend} bỗng không nói được, không ho được, không thở được và trông rất sợ. Con làm gì?'
        },
        choices: [
          {
            e: '📣',
            en: 'Shout for a grown-up to come right now',
            vi: 'Gọi to người lớn đến ngay',
            v: 'best',
            why: {
              en: 'This is an emergency. Grown-ups know how to help someone who is choking. Be loud!',
              vi: 'Đây là tình huống khẩn cấp. Người lớn biết cách giúp người bị hóc. Con hãy gọi thật to!'
            }
          },
          {
            e: '🥤',
            en: 'Give {friend} a drink of water',
            vi: 'Đưa nước cho {friend} uống',
            v: 'no',
            why: {
              en: "Water can't push the food out, and it may make things worse. Get a grown-up fast!",
              vi: 'Nước không đẩy được thức ăn ra, còn có thể làm tệ hơn. Gọi người lớn thật nhanh!'
            }
          },
          {
            e: '⏳',
            en: 'Wait to see if {friend} feels better soon',
            vi: 'Chờ xem {friend} có đỡ hơn không',
            v: 'no',
            why: {
              en: "Someone who can't breathe needs help right away. Shout for a grown-up!",
              vi: 'Người không thở được cần giúp ngay lập tức. Gọi to người lớn!'
            }
          }
        ],
        lesson: {
          en: "If someone can't breathe, talk or cough, shout for a grown-up straight away. It's an emergency.",
          vi: 'Nếu ai đó không thở, không nói, không ho được, hãy gọi to người lớn ngay. Đây là tình huống khẩn cấp.'
        }
      },
      {
        id: 'aid-bee-sting',
        tier: 1,
        scene: '🐝😣🚶',
        pic: {
          bg: 'park',
          cast: [
            { e: '🧒', you: true, think: '😣' },
            { e: '🐝', size: 's', up: 30 }
          ],
          props: ['🌸', '🐝']
        },
        q: {
          en: 'A bee stings your arm at the park. Ouch! More bees are buzzing around the flowers. What do you do?',
          vi: 'Ở công viên, một con ong đốt vào tay con. Đau quá! Còn nhiều con ong khác bay quanh hoa. Con làm gì?'
        },
        choices: [
          {
            e: '🚶',
            en: 'Walk away calmly and tell a grown-up',
            vi: 'Bình tĩnh đi ra xa và báo người lớn',
            v: 'best',
            why: {
              en: 'Moving away calmly keeps you safe from more stings. A grown-up can check the sting and put something cold on it.',
              vi: 'Bình tĩnh đi xa giúp con không bị đốt thêm. Người lớn sẽ xem vết đốt và chườm mát cho con.'
            }
          },
          {
            e: '👋',
            en: 'Swat at the bees to chase them away',
            vi: 'Đập tay đuổi lũ ong đi',
            v: 'no',
            why: {
              en: 'Swatting can upset the bees, and they may sting again. Walk away calmly.',
              vi: 'Đập đuổi làm ong tức giận và có thể đốt tiếp. Hãy bình tĩnh đi ra xa.'
            }
          },
          {
            e: '🤫',
            en: 'Keep it to yourself and carry on playing',
            vi: 'Không nói với ai và chơi tiếp',
            v: 'no',
            why: {
              en: 'A grown-up should check every sting. Some people swell up a lot, so always tell someone.',
              vi: 'Vết ong đốt cần người lớn xem. Có người bị sưng nhiều, nên con luôn phải báo cho người lớn.'
            }
          }
        ],
        lesson: {
          en: 'Bee sting? Walk away calmly and tell a grown-up. If your face swells or breathing feels hard, get help fast.',
          vi: 'Bị ong đốt? Bình tĩnh đi ra xa và báo người lớn. Nếu mặt sưng lên hoặc khó thở, phải nhờ giúp ngay.'
        }
      },
      {
        id: 'aid-allergy-no-sharing',
        tier: 2,
        scene: '🥜🥪🙅',
        value: 'care',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, think: '🤔' },
            { e: '🧒', say: { en: 'Can I have a bite?', vi: 'Cho tớ một miếng nhé?' } }
          ],
          props: ['🥪', '🥜']
        },
        q: {
          en: '{friend} is allergic to peanuts. At recess, {friend} asks for a bite of your peanut butter sandwich. What do you do?',
          vi: '{friend} bị dị ứng đậu phộng. Giờ ra chơi, {friend} xin một miếng bánh mì bơ đậu phộng của con. Con làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Kindly say no, and share a game instead',
            vi: 'Nhẹ nhàng từ chối, và rủ bạn chơi cùng',
            v: 'best',
            why: {
              en: 'Even a tiny bite could make {friend} very sick. You can still be kind by sharing a game.',
              vi: 'Chỉ một miếng nhỏ cũng có thể làm {friend} mệt nặng. Con vẫn tử tế được bằng cách rủ bạn chơi.'
            }
          },
          {
            e: '🤏',
            en: 'Give {friend} just a tiny bite',
            vi: 'Cho {friend} một miếng thật nhỏ thôi',
            v: 'no',
            why: {
              en: 'Even a tiny bit of peanut can make someone with an allergy very sick. Never share food with an allergic friend.',
              vi: 'Chỉ một chút đậu phộng cũng có thể làm người bị dị ứng mệt nặng. Đừng bao giờ chia đồ ăn cho bạn bị dị ứng.'
            }
          },
          {
            e: '🔪',
            en: 'Scrape off the peanut butter and share the bread',
            vi: 'Gạt bỏ lớp bơ đậu phộng rồi chia phần bánh mì',
            v: 'no',
            why: {
              en: "Tiny bits of peanut stay on the bread, even when you can't see them. It's safer not to share.",
              vi: 'Những mẩu đậu phộng li ti vẫn dính trên bánh, dù con không nhìn thấy. Không chia là an toàn nhất.'
            }
          }
        ],
        lesson: {
          en: 'Never share food with a friend who has an allergy — not even a tiny bit. Share games and smiles instead!',
          vi: 'Không bao giờ chia đồ ăn cho bạn bị dị ứng — dù chỉ một chút. Hãy chia sẻ trò chơi và nụ cười nhé!'
        }
      },
      {
        id: 'aid-burn',
        tier: 2,
        scene: '🍲✋🚰',
        pic: {
          bg: 'kitchen',
          cast: [{ e: '🧒', you: true, think: '😣' }],
          props: ['🍲']
        },
        q: {
          en: 'Oops! You touch a hot pot by accident. Your fingers hurt and look red. What should you do?',
          vi: 'Ối! Con lỡ chạm vào nồi nóng. Ngón tay con đau rát và đỏ lên. Con nên làm gì?'
        },
        choices: [
          {
            e: '🚰',
            en: 'Tell a grown-up and hold your fingers under cool running water',
            vi: 'Báo người lớn và để ngón tay dưới vòi nước mát đang chảy',
            v: 'best',
            why: {
              en: 'Cool running water takes the heat out. Keep it there a long time — about 20 minutes.',
              vi: 'Nước mát chảy liên tục giúp chỗ bỏng hạ nhiệt. Để tay dưới vòi thật lâu — khoảng 20 phút.'
            }
          },
          {
            e: '🧊',
            en: 'Hold an ice cube on it',
            vi: 'Chườm một viên đá lạnh lên',
            v: 'no',
            why: {
              en: 'Ice is too cold and can hurt the skin even more. Cool running water is best.',
              vi: 'Đá quá lạnh và có thể làm da đau thêm. Nước mát đang chảy là tốt nhất.'
            }
          },
          {
            e: '🪥',
            en: 'Rub toothpaste or butter on it',
            vi: 'Bôi kem đánh răng hoặc bơ lên',
            v: 'no',
            why: {
              en: 'Toothpaste and butter keep the heat in and can make it sorer. Use only cool running water.',
              vi: 'Kem đánh răng và bơ giữ hơi nóng lại, làm chỗ bỏng đau hơn. Chỉ dùng nước mát đang chảy thôi.'
            }
          }
        ],
        lesson: {
          en: 'Burn? Cool it under cool running water for about 20 minutes. No ice, butter or toothpaste. Tell a grown-up.',
          vi: 'Bị bỏng? Để dưới vòi nước mát khoảng 20 phút. Không chườm đá, không bôi bơ hay kem đánh răng. Báo người lớn.'
        }
      },
      {
        id: 'aid-nosebleed',
        tier: 2,
        scene: '👃🪑🙋',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '👩‍🏫', size: 'l', x: 82 }
          ],
          props: ['🧻']
        },
        q: {
          en: 'In class, your nose suddenly starts to bleed. What should you do?',
          vi: 'Trong lớp, mũi con bỗng chảy máu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🪑',
            en: 'Sit down, lean forward and pinch the soft part of your nose',
            vi: 'Ngồi xuống, cúi người về phía trước và bóp phần mềm của mũi',
            v: 'best',
            why: {
              en: 'Pinch for about 10 minutes and breathe through your mouth. Tell your teacher too.',
              vi: 'Bóp mũi khoảng 10 phút và thở bằng miệng. Nhớ báo thầy cô nữa nhé.'
            }
          },
          {
            e: '🙃',
            en: 'Tip your head back',
            vi: 'Ngửa đầu ra sau',
            v: 'no',
            why: {
              en: 'Lots of people do this, but then it runs down your throat and can upset your tummy. Lean forward instead.',
              vi: 'Nhiều người hay làm vậy, nhưng máu sẽ chảy xuống cổ họng và làm con buồn nôn. Hãy cúi người về phía trước.'
            }
          },
          {
            e: '🤧',
            en: 'Blow your nose hard',
            vi: 'Xì mũi thật mạnh',
            v: 'no',
            why: {
              en: 'Blowing hard can make it bleed more. Lean forward and pinch gently instead.',
              vi: 'Xì mạnh có thể làm chảy máu nhiều hơn. Hãy cúi người về trước và bóp mũi nhẹ nhàng.'
            }
          }
        ],
        lesson: {
          en: 'Nosebleed? Sit, lean forward, and pinch the soft part of your nose for about 10 minutes. Tell a grown-up.',
          vi: 'Chảy máu cam? Ngồi xuống, cúi người về trước, bóp phần mềm của mũi khoảng 10 phút. Báo người lớn.'
        }
      },
      {
        id: 'aid-head-bump',
        tier: 2,
        scene: '🛝🤕😴',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, think: '😴🤢' },
            { e: '👩', size: 'l' }
          ]
        },
        q: {
          en: 'You bumped your head hard on the slide. Later at home, you feel sleepy and a bit sick. What should you do?',
          vi: 'Con bị đập đầu mạnh vào cầu trượt. Lúc về nhà, con thấy buồn ngủ và hơi buồn nôn. Con nên làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: 'Tell Mummy or Daddy right away',
            vi: 'Báo ngay cho bố hoặc mẹ',
            v: 'best',
            why: {
              en: 'Feeling sleepy or sick after a head bump means a grown-up needs to check you, maybe with a doctor.',
              vi: 'Buồn ngủ hay buồn nôn sau khi bị đập đầu là dấu hiệu người lớn cần xem cho con, có thể cần đi bác sĩ.'
            }
          },
          {
            e: '😴',
            en: 'Go to bed early without telling anyone',
            vi: 'Đi ngủ sớm mà không nói với ai',
            v: 'no',
            why: {
              en: 'Rest is good, but a grown-up must know first. Feeling sleepy after a head bump needs checking.',
              vi: 'Nghỉ ngơi là tốt, nhưng người lớn phải biết trước đã. Buồn ngủ sau khi bị đập đầu cần được kiểm tra.'
            }
          },
          {
            e: '🤐',
            en: "Keep quiet so you don't get scolded",
            vi: 'Im lặng để khỏi bị mắng',
            v: 'no',
            why: {
              en: "You won't be in trouble. Grown-ups want to know about head bumps so they can keep you safe.",
              vi: 'Con không bị mắng đâu. Bố mẹ muốn biết khi con bị đập đầu để giữ an toàn cho con.'
            }
          }
        ],
        lesson: {
          en: 'Bumped your head? Tell a grown-up — right away if you feel sleepy, sick, dizzy or have a headache.',
          vi: 'Bị đập đầu? Báo người lớn — báo ngay nếu con thấy buồn ngủ, buồn nôn, chóng mặt hay đau đầu.'
        }
      },
      {
        id: 'aid-allergy-reaction',
        tier: 3,
        scene: '🎂👄🙋',
        value: 'care',
        pic: {
          bg: 'party',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '🧒', say: { en: "I'm fine, don't tell!", vi: 'Tớ không sao, đừng nói nhé!' } },
            { e: '👩', size: 'l', x: 88 }
          ],
          props: ['🍪']
        },
        q: {
          en: "At a party, {friend}, who has a nut allergy, eats a cookie. Soon {friend}'s lips look puffy. {friend} says, 'I'm fine, don't tell!'",
          vi: "Ở bữa tiệc, {friend} — bạn bị dị ứng các loại hạt — ăn một chiếc bánh quy. Lát sau môi {friend} sưng lên. {friend} nói: 'Tớ không sao, đừng nói với ai nhé!'"
        },
        choices: [
          {
            e: '🏃',
            en: 'Tell a grown-up right away, even though {friend} said not to',
            vi: 'Báo người lớn ngay, dù {friend} bảo đừng nói',
            v: 'best',
            why: {
              en: 'Puffy lips after eating can be an allergy, and it can get worse fast. Telling keeps {friend} safe — that’s a true friend.',
              vi: 'Môi sưng sau khi ăn có thể là dị ứng, và có thể nặng lên rất nhanh. Báo người lớn là giữ an toàn cho {friend} — đó mới là bạn tốt.'
            }
          },
          {
            e: '🤐',
            en: "Keep it secret — {friend} says it's fine",
            vi: 'Giữ bí mật — {friend} bảo không sao mà',
            v: 'no',
            why: {
              en: 'Some secrets must be told. A grown-up needs to know now, because an allergy can get worse quickly.',
              vi: 'Có những bí mật phải nói ra. Người lớn cần biết ngay, vì dị ứng có thể nặng lên rất nhanh.'
            }
          },
          {
            e: '💧',
            en: 'Give {friend} water and keep watching',
            vi: 'Đưa nước cho {friend} uống rồi theo dõi',
            v: 'no',
            why: {
              en: "Water won't stop an allergy. A grown-up needs to know straight away.",
              vi: 'Uống nước không làm hết dị ứng được. Người lớn cần biết ngay lập tức.'
            }
          }
        ],
        lesson: {
          en: 'If someone feels unwell after eating — puffy lips, itchy, or breathing feels funny — tell a grown-up right away.',
          vi: 'Nếu ai đó thấy khó chịu sau khi ăn — môi sưng, ngứa, hay thở thấy lạ — hãy báo người lớn ngay.'
        }
      }
    ]
  },

  // ───────────────────────────────────────────────────────────── 4. WATER
  {
    id: 'life.water-safety',
    world: 'sos',
    icon: '🏊',
    title: 'Water safety',
    vi: 'An toàn dưới nước',
    goal: 'Con biết chỉ bơi khi có người lớn trông, đi chậm quanh hồ bơi, biết nằm ngửa nổi như sao biển, và giúp bạn bằng cách gọi người lớn, ném phao chứ không nhảy xuống.',
    talk: [
      'Ở hồ bơi, ai sẽ là người lớn trông con? Nếu người đó đi đâu đó, con làm gì?',
      'Nếu bạn bị chới với dưới nước, vì sao con không nên nhảy xuống cứu?',
      'Lần tới đi bơi, mình tập nằm ngửa nổi như con sao biển (có bố mẹ đứng ngay cạnh) nhé.'
    ],
    scenarios: [
      {
        id: 'swim-grown-up-watching',
        tier: 1,
        scene: '🏊👀🙋',
        pic: {
          bg: 'pool',
          cast: [{ e: '🧒', you: true, think: '🤔' }],
          props: ['☀️']
        },
        q: {
          en: "It's a hot day. The pool at your condo looks cool and blue, but no grown-up is with you. What do you do?",
          vi: 'Trời nóng quá. Hồ bơi ở chung cư trông mát rượi, nhưng không có người lớn đi cùng con. Con làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Wait until a grown-up can come and watch you',
            vi: 'Đợi đến khi có người lớn ra trông con',
            v: 'best',
            why: {
              en: 'Always swim with a grown-up watching. Even good swimmers need someone looking out for them.',
              vi: 'Luôn bơi khi có người lớn trông. Bơi giỏi đến đâu cũng cần có người để mắt tới.'
            }
          },
          {
            e: '🤽',
            en: 'Jump in — you can swim a bit',
            vi: 'Nhảy xuống luôn — con biết bơi một chút mà',
            v: 'no',
            why: {
              en: 'Even good swimmers can get tired or swallow water. A grown-up must be watching every time.',
              vi: 'Người bơi giỏi cũng có lúc mệt hoặc bị sặc nước. Lần nào bơi cũng phải có người lớn trông.'
            }
          },
          {
            e: '🦶',
            en: 'Just play at the edge on your own',
            vi: 'Chỉ chơi ở mép hồ một mình thôi',
            v: 'no',
            why: {
              en: 'Even at the edge, you could slip in. Wait for a grown-up before going near the water.',
              vi: 'Ngay ở mép hồ, con vẫn có thể trượt chân rơi xuống. Đợi người lớn rồi mới lại gần nước nhé.'
            }
          }
        ],
        lesson: {
          en: 'Only swim, or play near water, when a grown-up is watching you — every time.',
          vi: 'Chỉ bơi hoặc chơi gần nước khi có người lớn trông — lần nào cũng vậy.'
        }
      },
      {
        id: 'swim-walk-dont-run',
        tier: 1,
        scene: '💦🚶🚫',
        pic: {
          bg: 'pool',
          cast: [
            { e: '🧒', say: { en: 'Race you to the slide!', vi: 'Thi chạy tới cầu trượt nào!' } },
            { e: '🧒', you: true, think: '❓' }
          ],
          props: ['💦']
        },
        q: {
          en: "At the swimming pool, {friend} shouts, 'Race you to the slide!' The floor is wet. What do you do?",
          vi: "Ở hồ bơi, {friend} gọi: 'Thi chạy tới cầu trượt nào!' Sàn đang ướt. Con làm gì?"
        },
        choices: [
          {
            e: '🚶',
            en: 'Walk there carefully — no running by the pool',
            vi: 'Đi cẩn thận tới đó — không chạy quanh hồ bơi',
            v: 'best',
            why: {
              en: 'Wet floors are slippery. Walking keeps you from slipping and bumping your head.',
              vi: 'Sàn ướt rất trơn. Đi bộ giúp con không bị trượt ngã đập đầu.'
            }
          },
          {
            e: '🏃',
            en: 'Run as fast as you can to win',
            vi: 'Chạy thật nhanh để thắng',
            v: 'no',
            why: {
              en: 'Wet floors are very slippery. You could slip and get hurt. Walk, don’t run!',
              vi: 'Sàn ướt rất trơn. Con có thể trượt ngã và bị đau. Đi bộ, không chạy nhé!'
            }
          },
          {
            e: '🤸',
            en: 'Push {friend} into the water for fun',
            vi: 'Đẩy {friend} xuống nước cho vui',
            v: 'no',
            why: {
              en: 'Pushing someone in can hurt them, and they might hit the side. Play gently and safely.',
              vi: 'Đẩy bạn xuống nước có thể làm bạn đau hoặc va vào thành hồ. Chơi nhẹ nhàng và an toàn nhé.'
            }
          }
        ],
        lesson: {
          en: 'By the pool: walk, don’t run — and never push anyone in.',
          vi: 'Quanh hồ bơi: đi bộ, không chạy — và không bao giờ đẩy ai xuống nước.'
        }
      },
      {
        id: 'swim-thunder',
        tier: 1,
        scene: '⛈️🏊🏠',
        pic: {
          bg: 'pool',
          cast: [{ e: '🧒', you: true, think: '👂' }],
          props: ['🌩️']
        },
        q: {
          en: "You are swimming when you hear thunder rumbling far away. It isn't raining yet. What should you do?",
          vi: 'Con đang bơi thì nghe tiếng sấm ầm ì từ xa. Trời chưa mưa. Con nên làm gì?'
        },
        choices: [
          {
            e: '🏠',
            en: 'Get out of the pool and go indoors',
            vi: 'Lên khỏi hồ và vào trong nhà',
            v: 'best',
            why: {
              en: "If you can hear thunder, lightning may be close by, and water isn't safe. Wait inside until a grown-up says it's safe.",
              vi: 'Nghe được tiếng sấm là sét có thể đang ở gần, và ở dưới nước không an toàn. Ở trong nhà đến khi người lớn bảo đã an toàn.'
            }
          },
          {
            e: '🏊',
            en: 'Keep swimming until it starts to rain',
            vi: 'Cứ bơi tiếp cho đến khi trời mưa',
            v: 'no',
            why: {
              en: 'Lightning can come before the rain. When thunder roars, get out and go indoors.',
              vi: 'Sét có thể đến trước cơn mưa. Nghe sấm là lên bờ và vào nhà ngay.'
            }
          },
          {
            e: '🦶',
            en: 'Sit on the edge with your feet in the water',
            vi: 'Ngồi trên mép hồ, thả chân xuống nước',
            v: 'no',
            why: {
              en: "Even your feet in the water aren't safe in a storm. Get right out and go inside.",
              vi: 'Khi có giông, thả chân xuống nước cũng không an toàn. Lên hẳn khỏi hồ và vào trong nhà.'
            }
          }
        ],
        lesson: {
          en: "When thunder roars, go indoors! Get out of the water and wait inside until it's safe.",
          vi: 'Nghe tiếng sấm là vào nhà! Lên khỏi nước và ở trong nhà cho đến khi an toàn.'
        }
      },
      {
        id: 'swim-friend-in-trouble',
        tier: 2,
        scene: '🆘🏊🛟',
        value: 'care',
        pic: {
          bg: 'pool',
          cast: [
            { e: '🧒', you: true, think: '😨' },
            { e: '🧒', think: '😰' }
          ],
          props: ['🛟']
        },
        q: {
          en: 'At the pool, {friend} is in the deep part, splashing and struggling to stay up. A float is next to you. What do you do?',
          vi: 'Ở hồ bơi, {friend} đang ở chỗ sâu, chới với và vùng vẫy. Cạnh con có một chiếc phao. Con làm gì?'
        },
        choices: [
          {
            e: '🛟',
            en: 'Shout for a grown-up and throw {friend} the float',
            vi: 'Gọi to người lớn và ném phao cho {friend}',
            v: 'best',
            why: {
              en: 'Shouting brings help fast, and the float gives {friend} something to hold. You stay safe on the side.',
              vi: 'Gọi to để người lớn đến giúp nhanh, còn phao giúp {friend} có chỗ bám. Con ở trên bờ cho an toàn.'
            }
          },
          {
            e: '🤽',
            en: 'Jump in to pull {friend} out',
            vi: 'Nhảy xuống kéo {friend} lên',
            v: 'no',
            why: {
              en: "That's brave, but a scared swimmer can grab you and pull you down too. Throw the float and shout for help.",
              vi: 'Con rất dũng cảm, nhưng người đang sợ có thể bám chặt và kéo con chìm theo. Hãy ném phao và gọi to người lớn.'
            }
          },
          {
            e: '👋',
            en: 'Wave back — {friend} is probably just playing',
            vi: 'Vẫy tay lại — chắc {friend} đang đùa thôi',
            v: 'no',
            why: {
              en: "Someone in trouble in the water can look like they're playing. If you're not sure, shout for a grown-up anyway.",
              vi: 'Người gặp nạn dưới nước đôi khi trông như đang đùa. Nếu không chắc, con cứ gọi to người lớn.'
            }
          }
        ],
        lesson: {
          en: "Someone in trouble in the water? Shout for help and throw something that floats. Don't jump in.",
          vi: 'Có người gặp nạn dưới nước? Gọi to người lớn và ném vật nổi. Không nhảy xuống.'
        }
      },
      {
        id: 'swim-starfish-float',
        tier: 2,
        scene: '⭐🌊😌',
        pic: {
          bg: 'pool',
          cast: [{ e: '🧒', you: true, think: '😨' }],
          props: ['💦']
        },
        q: {
          en: "You slip and fall into the deep end of the pool. Your feet can't touch the bottom. What do you do?",
          vi: 'Con trượt chân rơi xuống chỗ sâu của hồ bơi. Chân con không chạm đáy. Con làm gì?'
        },
        choices: [
          {
            e: '⭐',
            en: 'Stay calm, lie back and float like a starfish, then call for help',
            vi: 'Bình tĩnh, nằm ngửa nổi như con sao biển, rồi gọi người giúp',
            v: 'best',
            why: {
              en: 'Floating on your back keeps your face out of the water, so you can breathe and shout or wave for help.',
              vi: 'Nằm ngửa giúp mặt con nổi trên mặt nước, để con thở được và gọi hay vẫy tay nhờ giúp.'
            }
          },
          {
            e: '😱',
            en: 'Splash and kick as hard as you can',
            vi: 'Quẫy đạp thật mạnh',
            v: 'no',
            why: {
              en: 'Splashing hard makes you tired very quickly. Stay calm, lie back and float like a starfish.',
              vi: 'Quẫy mạnh làm con mệt rất nhanh. Hãy bình tĩnh, nằm ngửa và nổi như con sao biển.'
            }
          },
          {
            e: '🤫',
            en: 'Keep quiet so nobody sees you fell in',
            vi: 'Im lặng để không ai thấy con bị ngã',
            v: 'no',
            why: {
              en: "Don't worry about feeling silly. Grown-ups want to know — float, then shout and wave for help!",
              vi: 'Đừng ngại gì cả. Người lớn luôn muốn biết để giúp con — hãy nổi lên, rồi gọi to và vẫy tay!'
            }
          }
        ],
        lesson: {
          en: 'If you fall in: stay calm, lie back and float like a starfish, and call or wave for help.',
          vi: 'Nếu bị rơi xuống nước: bình tĩnh, nằm ngửa nổi như sao biển, rồi gọi hoặc vẫy tay nhờ giúp.'
        }
      },
      {
        id: 'swim-life-jacket',
        tier: 3,
        scene: '🚤🦺🌊',
        pic: {
          bg: 'beach',
          cast: [
            { e: '👨', size: 'l' },
            { e: '🧒', you: true, think: '🥵' }
          ],
          props: ['🚤', '🦺']
        },
        q: {
          en: "You're going on a boat ride. The life jacket feels hot and puffy, and you can swim a little. What do you do?",
          vi: 'Con đi chơi bằng thuyền. Áo phao mặc vào thấy nóng và cồng kềnh, mà con cũng biết bơi một chút. Con làm gì?'
        },
        choices: [
          {
            e: '🦺',
            en: 'Wear it, done up properly, for the whole boat ride',
            vi: 'Mặc áo phao, cài khoá cẩn thận, suốt cả chuyến đi',
            v: 'best',
            why: {
              en: 'A life jacket keeps you floating if you fall in. It only works if it fits and is done up.',
              vi: 'Áo phao giúp con nổi nếu bị rơi xuống nước. Áo chỉ có tác dụng khi vừa người và cài khoá đầy đủ.'
            }
          },
          {
            e: '🤲',
            en: 'Keep it on your lap, ready just in case',
            vi: 'Để áo phao trên đùi, khi nào cần thì mặc',
            v: 'no',
            why: {
              en: "If you fall in suddenly, there's no time to put it on. Wear it all the time on the boat.",
              vi: 'Nếu bị rơi xuống nước bất ngờ, con sẽ không kịp mặc. Hãy mặc suốt thời gian ở trên thuyền.'
            }
          },
          {
            e: '🙅',
            en: 'Take it off — you can swim',
            vi: 'Cởi ra — con biết bơi mà',
            v: 'no',
            why: {
              en: 'Even strong swimmers wear life jackets on boats. Open water can be deep and wavy.',
              vi: 'Người bơi giỏi khi đi thuyền cũng mặc áo phao. Sông biển có thể rất sâu và nhiều sóng.'
            }
          }
        ],
        lesson: {
          en: 'On a boat, always wear a life jacket that fits and is done up — the whole time.',
          vi: 'Đi thuyền, luôn mặc áo phao vừa người và cài khoá đầy đủ — suốt cả chuyến đi.'
        }
      }
    ]
  },

  // ───────────────────────────────────────────────────────────── 5. WEATHER & ANIMALS
  {
    id: 'life.weather-animals',
    world: 'sos',
    icon: '⛈️',
    title: 'Weather & animals',
    vi: 'Thời tiết và con vật',
    goal: 'Con biết giữ an toàn khi có sấm sét, nắng nóng, khói mù, mưa ngập, và khi gặp chó lạ, chó mèo hoang hay chỗ nước đọng có muỗi.',
    talk: [
      'Khi nghe tiếng sấm, con nên trú ở đâu? Vì sao không đứng dưới gốc cây?',
      'Nếu một con chó lạ sủa và chạy về phía con, con làm thế nào? Mình tập “đứng yên như cái cây” nhé.',
      'Sau cơn mưa lớn, vì sao con không được lội nước ngập hay chơi gần cống rãnh?',
      'Quanh nhà mình có chỗ nào đọng nước cho muỗi đẻ trứng không? Mình cùng đi tìm và đổ đi nhé.'
    ],
    scenarios: [
      {
        id: 'nature-lightning',
        tier: 1,
        scene: '⚡⚽🏢',
        pic: {
          bg: 'storm',
          cast: [
            { e: '🧒', you: true, think: '😮' },
            { e: '🧒' }
          ],
          props: ['⚽', '🌳']
        },
        q: {
          en: "You're playing football in an open field. Dark clouds roll in and you see a flash of lightning. What do you do?",
          vi: 'Con đang đá bóng ở bãi cỏ trống. Mây đen kéo đến và con thấy một tia chớp. Con làm gì?'
        },
        choices: [
          {
            e: '🏢',
            en: 'Go inside a building with your grown-up straight away',
            vi: 'Cùng người lớn vào trong một toà nhà ngay',
            v: 'best',
            why: {
              en: "A building is the safest place in a storm. Wait inside until a grown-up says it's safe.",
              vi: 'Trong nhà là nơi an toàn nhất khi có giông. Ở trong đó cho đến khi người lớn bảo đã an toàn.'
            }
          },
          {
            e: '🌳',
            en: 'Shelter under the tallest tree',
            vi: 'Trú dưới gốc cây cao nhất',
            v: 'no',
            why: {
              en: 'Lightning often strikes tall trees. Stay away from them and go into a building.',
              vi: 'Sét hay đánh vào cây cao. Hãy tránh xa cây và vào trong một toà nhà.'
            }
          },
          {
            e: '⚽',
            en: 'Keep playing until it starts to rain',
            vi: 'Cứ chơi tiếp cho đến khi trời mưa',
            v: 'no',
            why: {
              en: 'Lightning can strike before the rain comes. Go indoors as soon as you see lightning or hear thunder.',
              vi: 'Sét có thể đánh trước khi mưa tới. Thấy chớp hay nghe sấm là vào nhà ngay.'
            }
          }
        ],
        lesson: {
          en: "Lightning or thunder? Go inside a building — not under a tree — and wait until it's safe.",
          vi: 'Có sấm chớp? Vào trong nhà — không trú dưới gốc cây — và đợi đến khi an toàn.'
        }
      },
      {
        id: 'nature-hot-day',
        tier: 1,
        scene: '☀️🥵💧',
        pic: {
          bg: 'playground',
          cast: [{ e: '🧒', you: true, think: '🥵' }],
          props: ['☀️']
        },
        q: {
          en: "It's a very hot day at the playground. You start to feel dizzy and very tired. What should you do?",
          vi: 'Trời rất nóng ở sân chơi. Con bắt đầu thấy chóng mặt và rất mệt. Con nên làm gì?'
        },
        choices: [
          {
            e: '🌳',
            en: 'Stop, rest in the shade, drink water and tell a grown-up',
            vi: 'Dừng chơi, nghỉ trong bóng râm, uống nước và báo người lớn',
            v: 'best',
            why: {
              en: 'Feeling dizzy on a hot day means your body needs to cool down. Shade, water and rest help.',
              vi: 'Chóng mặt khi trời nóng là cơ thể con cần được làm mát. Bóng râm, nước và nghỉ ngơi sẽ giúp con.'
            }
          },
          {
            e: '🏃',
            en: "Keep playing — you're nearly winning",
            vi: 'Chơi tiếp — sắp thắng rồi',
            v: 'no',
            why: {
              en: "Your body is telling you it's too hot. Stop and rest in the shade with some water first.",
              vi: 'Cơ thể đang báo cho con biết là nóng quá rồi. Dừng lại, nghỉ trong bóng râm và uống nước đã.'
            }
          },
          {
            e: '☀️',
            en: 'Lie down on the sunny grass to rest',
            vi: 'Nằm nghỉ trên bãi cỏ ngoài nắng',
            v: 'no',
            why: {
              en: 'Resting is a good idea, but the sun keeps you hot. Rest in the shade and drink water.',
              vi: 'Nghỉ là đúng, nhưng nằm ngoài nắng vẫn nóng. Hãy nghỉ trong bóng râm và uống nước.'
            }
          }
        ],
        lesson: {
          en: 'Hot day? Wear a hat, drink water and play in the shade. Feel dizzy? Rest, cool down and tell a grown-up.',
          vi: 'Trời nóng? Đội mũ, uống nước và chơi trong bóng râm. Thấy chóng mặt? Nghỉ ngơi, làm mát và báo người lớn.'
        }
      },
      {
        id: 'nature-dog-chasing',
        tier: 1,
        scene: '🐕💨🌳',
        pic: {
          bg: 'park',
          cast: [
            { e: '🧒', you: true, think: '😨' },
            { e: '🐕', flip: true, say: { en: 'Woof! Woof!', vi: 'Gâu! Gâu!' } }
          ]
        },
        q: {
          en: "A dog you don't know runs towards you, barking loudly. What should you do?",
          vi: 'Một con chó lạ sủa to và chạy về phía con. Con nên làm gì?'
        },
        choices: [
          {
            e: '🌳',
            en: 'Stand still like a tree, hands in, and look at your feet',
            vi: 'Đứng yên như cái cây, khép tay lại và nhìn xuống chân',
            v: 'best',
            why: {
              en: 'Most dogs lose interest when you are still and quiet. When it goes away, walk off slowly and tell a grown-up.',
              vi: 'Phần lớn chó sẽ mất hứng khi con đứng yên và im lặng. Khi chó đi rồi, con từ từ đi chỗ khác và báo người lớn.'
            }
          },
          {
            e: '🏃',
            en: 'Run away as fast as you can',
            vi: 'Chạy thật nhanh',
            v: 'no',
            why: {
              en: 'Running can make a dog want to chase you. Stand still like a tree instead.',
              vi: 'Chạy có thể làm chó muốn đuổi theo con. Hãy đứng yên như cái cây.'
            }
          },
          {
            e: '😱',
            en: 'Scream and wave your arms at it',
            vi: 'Hét lên và vung tay về phía chó',
            v: 'no',
            why: {
              en: 'Screaming and waving can make a dog more excited. Stay still and quiet like a tree.',
              vi: 'Hét và vung tay làm chó càng hăng hơn. Hãy đứng yên và im lặng như cái cây.'
            }
          }
        ],
        lesson: {
          en: 'A strange dog runs at you? Be a tree: stand still, hands in, look at your feet. Then tell a grown-up.',
          vi: 'Chó lạ chạy tới? Làm cái cây: đứng yên, khép tay, nhìn xuống chân. Sau đó báo người lớn.'
        }
      },
      {
        id: 'nature-stray-animal',
        tier: 2,
        scene: '🐈👀🙅',
        pic: {
          bg: 'street',
          cast: [
            { e: '🧒', you: true, think: '🥰' },
            { e: '🐈', size: 's', flip: true }
          ]
        },
        q: {
          en: 'A thin, friendly-looking cat walks up to you near your block. You really want to pat it. What do you do?',
          vi: 'Gần nhà, một con mèo gầy trông rất hiền đi lại gần con. Con rất muốn vuốt ve nó. Con làm gì?'
        },
        choices: [
          {
            e: '👀',
            en: "Look and smile, but don't touch it",
            vi: 'Ngắm và mỉm cười, nhưng không chạm vào',
            v: 'best',
            why: {
              en: 'Animals you don’t know may scratch or bite if they get scared, even friendly-looking ones.',
              vi: 'Con vật lạ có thể cào hoặc cắn khi bị giật mình, kể cả khi trông rất hiền.'
            }
          },
          {
            e: '🍪',
            en: 'Feed it some of your snack from your hand',
            vi: 'Cầm bánh trên tay cho mèo ăn',
            v: 'no',
            why: {
              en: "A hungry animal might nip your fingers by mistake. Look, but don't touch or feed.",
              vi: 'Con vật đói có thể lỡ cắn vào ngón tay con. Chỉ ngắm thôi, không chạm hay cho ăn.'
            }
          },
          {
            e: '🤗',
            en: 'Pick it up for a cuddle',
            vi: 'Bế mèo lên ôm',
            v: 'no',
            why: {
              en: "Animals that don't know you can get scared when picked up and may scratch. Look, don't touch.",
              vi: 'Con vật không quen con có thể sợ khi bị bế lên và cào con. Chỉ ngắm, không chạm nhé.'
            }
          }
        ],
        lesson: {
          en: "Look at stray animals, but don't touch them. If an animal scratches or bites you, tell a grown-up right away.",
          vi: 'Chỉ ngắm chó mèo hoang, không chạm vào. Nếu bị cào hay cắn, phải báo người lớn ngay.'
        }
      },
      {
        id: 'nature-mosquito-water',
        tier: 2,
        scene: '🦟🪣💧',
        value: 'responsibility',
        pic: {
          bg: 'window',
          cast: [{ e: '🧒', you: true, think: '❓' }],
          props: ['🪣', '💧', '🦟']
        },
        q: {
          en: 'After the rain, your toy bucket outside is full of still water. What should you do?',
          vi: 'Sau cơn mưa, chiếc xô đồ chơi để ngoài trời đầy nước đọng. Con nên làm gì?'
        },
        choices: [
          {
            e: '🪣',
            en: 'Tip the water out and turn the bucket upside down',
            vi: 'Đổ hết nước đi và úp ngược xô lại',
            v: 'best',
            why: {
              en: 'Mosquitoes lay eggs in still water. Tipping it out means fewer mosquitoes, and fewer bites that can make people sick.',
              vi: 'Muỗi đẻ trứng trong nước đọng. Đổ nước đi thì sẽ ít muỗi hơn, và ít bị muỗi đốt gây bệnh hơn.'
            }
          },
          {
            e: '⏰',
            en: 'Leave it there to play with tomorrow',
            vi: 'Để đó, mai chơi tiếp',
            v: 'no',
            why: {
              en: 'In about a week, baby mosquitoes can grow in still water. Tip it out today.',
              vi: 'Chỉ khoảng một tuần là muỗi con đã lớn lên trong nước đọng. Đổ đi ngay hôm nay nhé.'
            }
          },
          {
            e: '🪴',
            en: "Pour it into the plant pot's plate",
            vi: 'Đổ nước sang đĩa lót chậu cây',
            v: 'no',
            why: {
              en: 'That is still standing water, and mosquitoes like it there too. Pour it away and keep the plate dry.',
              vi: 'Như vậy vẫn là nước đọng, muỗi vẫn đẻ trứng được. Đổ hẳn nước đi và giữ đĩa lót luôn khô.'
            }
          }
        ],
        lesson: {
          en: 'Mosquitoes grow in still water. Tip out water from buckets, pots and plates, and turn them over.',
          vi: 'Muỗi sinh ra từ nước đọng. Đổ hết nước trong xô, chậu, đĩa lót và úp chúng xuống.'
        }
      },
      {
        id: 'nature-floodwater',
        tier: 2,
        scene: '🌧️🌊🚫',
        pic: {
          bg: 'storm',
          cast: [
            { e: '🧒', you: true, think: '🤔' },
            { e: '🧒', say: { en: "Let's splash!", vi: 'Lội nước chơi đi!' } }
          ],
          props: ['🌊']
        },
        q: {
          en: "After heavy rain, the path is flooded with brown water and the drain beside it is rushing. {friend} says, 'Let's splash!' What do you do?",
          vi: "Sau trận mưa lớn, lối đi ngập nước đục và cống bên cạnh nước chảy xiết. {friend} rủ: 'Mình lội nước chơi đi!' Con làm gì?"
        },
        choices: [
          {
            e: '🙅',
            en: 'Say no, and stay on dry ground away from the drain',
            vi: 'Từ chối, và đứng ở chỗ khô, tránh xa cống',
            v: 'best',
            why: {
              en: 'Floodwater can hide holes and open drains, it can be dirty, and it can flow fast enough to knock you over.',
              vi: 'Nước ngập có thể che mất hố và miệng cống, nước lại bẩn, và có thể chảy mạnh đến mức làm con ngã.'
            }
          },
          {
            e: '💦',
            en: 'Jump in and splash with {friend}',
            vi: 'Nhảy xuống lội nước cùng {friend}',
            v: 'no',
            why: {
              en: "Floodwater isn't like a puddle. It can hide holes and drains, and it may be dirty. Stay on dry ground.",
              vi: 'Nước ngập không giống vũng nước nhỏ. Nó có thể che hố và cống, lại bẩn nữa. Hãy đứng ở chỗ khô.'
            }
          },
          {
            e: '🥾',
            en: 'Walk through slowly in your rain boots',
            vi: 'Đi ủng lội chậm qua',
            v: 'no',
            why: {
              en: "Even in boots, you can't see what's under the water. Stay out of floodwater and away from drains.",
              vi: 'Đi ủng thì con vẫn không thấy được dưới nước có gì. Đừng lội nước ngập và tránh xa cống rãnh.'
            }
          }
        ],
        lesson: {
          en: 'After heavy rain, stay out of floodwater and far from drains and canals. Wait on dry ground with a grown-up.',
          vi: 'Sau mưa lớn, không lội nước ngập, tránh xa cống rãnh và kênh mương. Đợi ở chỗ khô cùng người lớn.'
        }
      },
      {
        id: 'nature-haze',
        tier: 3,
        scene: '🌫️😷🏠',
        pic: {
          bg: 'window',
          cast: [
            { e: '🧒', you: true, think: '🤔' },
            { e: '🧒', say: { en: "Let's play catching outside!", vi: 'Ra ngoài chơi đuổi bắt đi!' } }
          ],
          props: ['🌫️']
        },
        q: {
          en: 'The sky is grey and hazy, and the air smells smoky. Your friends want to play catching outside. What do you do?',
          vi: 'Trời mù mịt khói và không khí có mùi khét. Các bạn rủ con ra ngoài chơi đuổi bắt. Con làm gì?'
        },
        choices: [
          {
            e: '🏠',
            en: 'Suggest playing a game indoors instead',
            vi: 'Rủ các bạn chơi một trò trong nhà',
            v: 'best',
            why: {
              en: "Hazy air isn't good to breathe, especially when you run hard. Indoor games keep everyone's lungs happy.",
              vi: 'Hít không khí nhiều khói mù không tốt, nhất là khi chạy nhiều. Chơi trong nhà giúp giữ phổi khoẻ cho mọi người.'
            }
          },
          {
            e: '🚶',
            en: 'Play outside, but only gentle games with no running',
            vi: 'Chơi ngoài trời, nhưng chỉ chơi nhẹ, không chạy',
            v: 'ok',
            why: {
              en: 'Taking it easy helps, but on a hazy day, playing indoors is even better for your lungs.',
              vi: 'Chơi nhẹ là tốt rồi, nhưng hôm có khói mù, chơi trong nhà còn tốt cho phổi hơn.'
            }
          },
          {
            e: '🏃',
            en: "Run outside — it's only a bit grey",
            vi: 'Chạy ra ngoài — trời chỉ hơi xám thôi mà',
            v: 'no',
            why: {
              en: 'Running makes you breathe in more of the smoky air. Play inside until the air is clear.',
              vi: 'Chạy nhiều làm con hít vào nhiều khói hơn. Chơi trong nhà cho đến khi không khí trong lành trở lại.'
            }
          }
        ],
        lesson: {
          en: 'On a hazy day, play indoors. Tell a grown-up if breathing feels hard or you keep coughing.',
          vi: 'Hôm trời có khói mù, hãy chơi trong nhà. Báo người lớn nếu con thấy khó thở hoặc ho nhiều.'
        }
      }
    ]
  }
];
