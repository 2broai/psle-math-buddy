// World: healthy — see README.md in this folder for the format.
export const TOPICS = [
  // ───────────────────────────── Clean hands & teeth ─────────────────────────────
  {
    id: 'life.hygiene',
    world: 'healthy',
    icon: '🧼',
    title: 'Clean hands & teeth',
    vi: 'Tay sạch, răng khoẻ',
    goal: 'Con biết rửa tay bằng xà phòng khoảng 20 giây vào đúng lúc, che miệng khi ho hay hắt hơi, và đánh răng mỗi ngày hai lần.',
    talk: [
      'Hôm nay con đã rửa tay những lúc nào? Còn lúc nào nữa cũng nên rửa tay?',
      'Mình cùng vừa rửa tay vừa hát "Happy Birthday" hai lần, xem có đủ lâu không nhé.',
      'Vì sao buổi tối dù buồn ngủ vẫn nên đánh răng?'
    ],
    scenarios: [
      {
        id: 'hands-before-snack',
        tier: 1,
        scene: '🛝🧼🍎',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🍪😋' }], props: ['🍪', '🍎'] },
        q: {
          en: "You come home from the playground, and there's a snack on the table. What do you do first?",
          vi: 'Con đi chơi ở sân chơi về, trên bàn có sẵn đồ ăn nhẹ. Con làm gì trước tiên?'
        },
        choices: [
          {
            e: '🧼',
            en: 'Wash your hands with soap and water',
            vi: 'Rửa tay bằng xà phòng và nước',
            v: 'best',
            why: {
              en: "Playground hands pick up germs you can't see. Washing them off keeps the germs out of your tummy.",
              vi: 'Đi chơi về, tay dính nhiều vi trùng mà mắt không thấy được. Rửa sạch để vi trùng không theo đồ ăn vào bụng con.'
            }
          },
          {
            e: '👕',
            en: 'Wipe your hands on your shirt',
            vi: 'Chùi tay vào áo',
            v: 'no',
            why: {
              en: "Wiping doesn't take the germs away. It just moves them onto your shirt. Soap and water work best.",
              vi: 'Chùi vào áo không làm hết vi trùng, chỉ là chuyển chúng sang áo thôi. Xà phòng và nước mới làm sạch.'
            }
          },
          {
            e: '🍪',
            en: 'Eat now and wash later',
            vi: 'Ăn trước, rửa tay sau',
            v: 'no',
            why: {
              en: 'If you eat first, the germs on your hands go onto your food. Wash first, then enjoy your snack!',
              vi: 'Ăn trước thì vi trùng trên tay sẽ dính vào đồ ăn. Rửa tay trước, rồi ăn cho ngon nhé!'
            }
          }
        ],
        lesson: {
          en: 'Wash your hands with soap before you eat and after you play outside.',
          vi: 'Rửa tay bằng xà phòng trước khi ăn và sau khi đi chơi ngoài trời về.'
        }
      },
      {
        id: 'hands-after-toilet',
        tier: 1,
        scene: '🚽🧼🙌',
        pic: { bg: 'bathroom', cast: [{ e: '🧒', you: true, x: 70, think: '🏃🛝' }] },
        q: {
          en: 'You just went to the toilet for a quick wee. Your friends are waiting to play. What do you do next?',
          vi: 'Con vừa đi tè xong. Các bạn đang chờ con ra chơi. Tiếp theo con làm gì?'
        },
        choices: [
          {
            e: '🧼',
            en: 'Flush, then wash your hands with soap',
            vi: 'Xả nước bồn cầu, rồi rửa tay bằng xà phòng',
            v: 'best',
            why: {
              en: "Toilet germs are too small to see, even after a quick wee. A good wash only takes a moment, then off you go!",
              vi: 'Vi trùng ở nhà vệ sinh nhỏ xíu, không nhìn thấy được, kể cả khi chỉ đi tè nhanh. Rửa tay một chút thôi rồi con ra chơi!'
            }
          },
          {
            e: '🏃',
            en: 'Run back to play, because it was only a quick one',
            vi: 'Chạy ra chơi tiếp, vì đi nhanh mà',
            v: 'no',
            why: {
              en: 'Even a quick toilet trip leaves germs on your hands. Washing keeps you and your friends well.',
              vi: 'Dù đi nhanh, tay con vẫn dính vi trùng. Rửa tay giúp con và các bạn khoẻ mạnh.'
            }
          },
          {
            e: '💦',
            en: 'Rinse your fingertips with a little water',
            vi: 'Tráng đầu ngón tay qua nước',
            v: 'no',
            why: {
              en: 'Water alone leaves most germs behind. Rub soap all over your hands, then rinse.',
              vi: 'Chỉ tráng nước thì vi trùng vẫn còn gần hết. Con xoa xà phòng khắp hai bàn tay rồi mới xả nước.'
            }
          }
        ],
        lesson: {
          en: 'After the toilet: flush, then wash your hands with soap, every time.',
          vi: 'Đi vệ sinh xong: xả nước, rồi rửa tay bằng xà phòng, lần nào cũng vậy.'
        }
      },
      {
        id: 'germs-sneeze',
        tier: 1,
        scene: '🏫🤧💪',
        pic: { bg: 'classroom', cast: [{ e: '🧒', you: true, think: '🤧' }, { e: '🧒' }, { e: '🧒' }] },
        q: {
          en: "You are in class, and you feel a big sneeze coming. You don't have a tissue. What should you do?",
          vi: 'Con đang ngồi trong lớp và sắp hắt hơi một cái thật to. Con không có khăn giấy. Con nên làm gì?'
        },
        choices: [
          {
            e: '💪',
            en: 'Sneeze into your elbow',
            vi: 'Hắt hơi vào khuỷu tay',
            v: 'best',
            why: {
              en: "Your elbow catches the germs, and it doesn't touch pencils and toys the way your hands do.",
              vi: 'Khuỷu tay giữ lại vi trùng, mà khuỷu tay lại không cầm bút, cầm đồ chơi như bàn tay.'
            }
          },
          {
            e: '🤲',
            en: 'Sneeze into your hands',
            vi: 'Hắt hơi vào lòng bàn tay',
            v: 'ok',
            why: {
              en: 'Covering your sneeze is good. But hands touch lots of things, so germs spread. Use your elbow, or wash your hands after.',
              vi: 'Che lại là tốt. Nhưng tay chạm vào nhiều thứ nên dễ lây vi trùng. Con dùng khuỷu tay, hoặc rửa tay ngay sau đó.'
            }
          },
          {
            e: '🌬️',
            en: 'Sneeze into the air',
            vi: 'Hắt hơi ra ngoài, không che',
            v: 'no',
            why: {
              en: 'A sneeze sprays tiny drops across the room, and friends can catch your germs. Cover it with your elbow.',
              vi: 'Hắt hơi làm bắn ra những giọt nhỏ bay khắp lớp, các bạn có thể bị lây. Con che bằng khuỷu tay nhé.'
            }
          }
        ],
        lesson: {
          en: 'Cough or sneeze into a tissue or your elbow, not into the air.',
          vi: 'Ho hay hắt hơi thì che bằng khăn giấy hoặc khuỷu tay, đừng hắt ra không khí.'
        }
      },
      {
        id: 'hands-20-seconds',
        tier: 2,
        scene: '🧼⏱️🎶',
        pic: { bg: 'bathroom', cast: [{ e: '🧒', you: true, x: 30, think: '⏱️❓' }], props: ['🫧'] },
        q: {
          en: 'You are washing your hands with soap. How long should you scrub?',
          vi: 'Con đang rửa tay bằng xà phòng. Con nên chà tay bao lâu?'
        },
        choices: [
          {
            e: '🎶',
            en: "While you sing 'Happy Birthday' twice, about 20 seconds",
            vi: "Trong lúc hát bài 'Happy Birthday' hai lần, khoảng 20 giây",
            v: 'best',
            why: {
              en: 'That gives the soap time to work. Scrub your palms, the backs, between your fingers and under your nails.',
              vi: 'Như vậy xà phòng có đủ thời gian làm sạch. Con chà lòng bàn tay, mu bàn tay, kẽ ngón và dưới móng tay.'
            }
          },
          {
            e: '💦',
            en: 'A quick splash: one, two, done!',
            vi: 'Vẩy nước nhanh: một, hai, xong!',
            v: 'no',
            why: {
              en: 'A quick splash leaves most germs behind. Soap needs a little time to do its job.',
              vi: 'Vẩy nước nhanh thì vi trùng vẫn còn gần hết. Xà phòng cần một chút thời gian để làm sạch.'
            }
          },
          {
            e: '🫧',
            en: 'Soap on, then rinse straight away',
            vi: 'Xoa xà phòng rồi xả nước ngay',
            v: 'ok',
            why: {
              en: 'Using soap is great. Now give it more time: scrub for about 20 seconds before you rinse.',
              vi: 'Có dùng xà phòng là tốt rồi. Giờ con chà lâu hơn, khoảng 20 giây, rồi mới xả nước nhé.'
            }
          }
        ],
        lesson: {
          en: "Scrub with soap for 20 seconds (two 'Happy Birthday' songs), then rinse and dry.",
          vi: "Chà tay với xà phòng 20 giây (bằng hai lần hát 'Happy Birthday'), rồi xả nước và lau khô."
        }
      },
      {
        id: 'germs-tissue',
        tier: 2,
        scene: '🤧🧻🗑️',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🧻❓' }], props: ['🧻'] },
        q: {
          en: 'You just blew your nose with a tissue. What should you do with the used tissue?',
          vi: 'Con vừa xì mũi bằng khăn giấy. Con nên làm gì với tờ khăn giấy đã dùng?'
        },
        choices: [
          {
            e: '🗑️',
            en: 'Throw it in the bin, then wash your hands',
            vi: 'Bỏ vào thùng rác, rồi rửa tay',
            v: 'best',
            why: {
              en: 'The bin keeps the germs away from everyone, and washing gets your hands clean again.',
              vi: 'Bỏ vào thùng rác để vi trùng không lây cho ai, và rửa tay để tay sạch trở lại.'
            }
          },
          {
            e: '👖',
            en: 'Put it back in your pocket to use later',
            vi: 'Cất lại vào túi để lát dùng tiếp',
            v: 'no',
            why: {
              en: 'A used tissue is full of germs. Use a fresh tissue each time and put the old one in the bin.',
              vi: 'Khăn giấy đã dùng chứa đầy vi trùng. Mỗi lần con dùng một tờ mới, tờ cũ thì bỏ vào thùng rác.'
            }
          },
          {
            e: '🪑',
            en: 'Leave it on the table for now',
            vi: 'Để tạm trên bàn',
            v: 'no',
            why: {
              en: 'Someone might touch it and pick up the germs. Straight into the bin is best.',
              vi: 'Người khác có thể chạm vào và bị lây vi trùng. Bỏ ngay vào thùng rác là tốt nhất.'
            }
          }
        ],
        lesson: {
          en: 'Used tissue? Put it in the bin, then wash your hands.',
          vi: 'Khăn giấy đã dùng? Bỏ vào thùng rác, rồi rửa tay.'
        }
      },
      {
        id: 'teeth-sleepy',
        tier: 2,
        scene: '🪥🌙😴',
        pic: { bg: 'bedroom', cast: [{ e: '🧒', you: true, think: '😴' }], props: ['🪥'] },
        q: {
          en: "It's bedtime and you're very sleepy. You haven't brushed your teeth yet. What should you do?",
          vi: 'Đến giờ đi ngủ mà con buồn ngủ lắm rồi. Con chưa đánh răng. Con nên làm gì?'
        },
        choices: [
          {
            e: '🪥',
            en: 'Brush your teeth, then go to bed',
            vi: 'Đánh răng rồi mới đi ngủ',
            v: 'best',
            why: {
              en: 'Brushing at night cleans away the food and sugar from the day, so your teeth stay strong while you sleep.',
              vi: 'Đánh răng buổi tối làm sạch thức ăn và đường bám trong ngày, giúp răng chắc khoẻ suốt đêm.'
            }
          },
          {
            e: '🛏️',
            en: 'Skip it tonight, because you brushed this morning',
            vi: 'Tối nay bỏ qua, vì sáng nay đánh rồi',
            v: 'no',
            why: {
              en: "Morning brushing is great, but the whole day's food is still on your teeth. Brush twice a day.",
              vi: 'Sáng đánh răng là tốt, nhưng thức ăn cả ngày vẫn còn bám trên răng. Mỗi ngày đánh răng hai lần nhé.'
            }
          },
          {
            e: '🥛',
            en: 'Just rinse your mouth with water',
            vi: 'Chỉ súc miệng bằng nước thôi',
            v: 'ok',
            why: {
              en: 'Rinsing helps a little. But only brushing with toothpaste really cleans your teeth.',
              vi: 'Súc miệng cũng giúp được một chút. Nhưng phải đánh răng với kem đánh răng mới sạch thật sự.'
            }
          }
        ],
        lesson: {
          en: 'Brush your teeth twice a day: in the morning and before bed.',
          vi: 'Đánh răng mỗi ngày hai lần: buổi sáng và trước khi đi ngủ.'
        }
      },
      {
        id: 'hands-look-clean',
        tier: 3,
        scene: '🙌✨🍱',
        pic: { bg: 'canteen', cast: [{ e: '🧒', you: true, think: '🙌✨' }] },
        q: {
          en: "It's lunchtime. You look at your hands, and they look clean! What should you do?",
          vi: 'Tới giờ ăn trưa. Con nhìn tay mình, trông sạch lắm! Con nên làm gì?'
        },
        choices: [
          {
            e: '🧼',
            en: 'Wash them with soap anyway',
            vi: 'Vẫn rửa tay bằng xà phòng',
            v: 'best',
            why: {
              en: 'Germs are too tiny to see. Hands can look clean and still have germs on them.',
              vi: 'Vi trùng nhỏ xíu, mắt không nhìn thấy. Tay trông sạch mà vẫn có thể có vi trùng.'
            }
          },
          {
            e: '👀',
            en: "Skip washing, because they look clean",
            vi: 'Không cần rửa, vì tay trông sạch mà',
            v: 'no',
            why: {
              en: "Germs hide where you can't see them. Washing before you eat is a good habit every time.",
              vi: 'Vi trùng nấp ở chỗ con không nhìn thấy. Rửa tay trước khi ăn là thói quen tốt, lần nào cũng vậy.'
            }
          },
          {
            e: '🧻',
            en: 'Wipe them with a wet wipe',
            vi: 'Lau tay bằng khăn ướt',
            v: 'ok',
            why: {
              en: "A wet wipe is better than nothing when there's no sink. But when you can use soap and water, washing is best.",
              vi: 'Khi không có bồn rửa thì lau khăn ướt cũng còn hơn không. Nhưng có xà phòng và nước thì rửa tay vẫn là tốt nhất.'
            }
          }
        ],
        lesson: {
          en: 'Germs are too small to see. Wash with soap before eating, even when your hands look clean.',
          vi: 'Vi trùng nhỏ đến mức không nhìn thấy. Luôn rửa tay bằng xà phòng trước khi ăn, kể cả khi tay trông sạch.'
        }
      }
    ]
  },

  // ───────────────────────────── Food and water ─────────────────────────────
  {
    id: 'life.food-water',
    world: 'healthy',
    icon: '🥦',
    title: 'Food and water',
    vi: 'Ăn uống lành mạnh',
    goal: 'Con biết uống nước lọc khi khát, ăn sáng, ăn nhiều rau và trái cây, ngồi vào bàn để ăn, dám thử món mới và ăn đồ ngọt vừa phải.',
    talk: [
      'Đĩa ăn của con hôm nay có những màu gì? Mình thử thêm một màu rau hay trái cây nữa nhé.',
      'Khi khát, cơ thể mình cần gì nhất?',
      'Có món nào trước đây con chưa thích mà giờ lại thấy ngon không?'
    ],
    scenarios: [
      {
        id: 'food-thirsty',
        tier: 1,
        scene: '⚽🥵💧',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, x: 50, think: '🥵' }], props: ['⚽'] },
        q: {
          en: "You've been running around, and you feel really thirsty. What's the best drink?",
          vi: 'Con vừa chạy nhảy nhiều và thấy khát lắm. Uống gì là tốt nhất?'
        },
        choices: [
          {
            e: '💧',
            en: 'Plain water',
            vi: 'Nước lọc',
            v: 'best',
            why: {
              en: "Water is what your body needs most when you're thirsty. It has no sugar, so it's kind to your teeth too.",
              vi: 'Khi khát, cơ thể cần nước lọc nhất. Nước lọc không có đường nên cũng tốt cho răng.'
            }
          },
          {
            e: '🥤',
            en: 'A can of sweet fizzy drink',
            vi: 'Một lon nước ngọt có ga',
            v: 'no',
            why: {
              en: 'Fizzy drinks are a sometimes treat. They have lots of sugar, which is hard on your teeth. For thirst, water works best.',
              vi: 'Nước ngọt có ga là món thỉnh thoảng mới uống. Trong đó có rất nhiều đường, không tốt cho răng. Khi khát, nước lọc là tốt nhất.'
            }
          },
          {
            e: '🥛',
            en: 'A glass of plain milk',
            vi: 'Một ly sữa tươi không đường',
            v: 'ok',
            why: {
              en: 'Milk helps you grow strong bones. But when you are thirsty after playing, water is the best drink.',
              vi: 'Sữa giúp xương chắc khoẻ. Nhưng khi chạy nhảy xong mà khát, nước lọc là tốt nhất.'
            }
          }
        ],
        lesson: {
          en: 'Thirsty? Water first! Sweet drinks are for sometimes.',
          vi: 'Khát nước? Uống nước lọc trước! Đồ uống ngọt thì thỉnh thoảng thôi.'
        }
      },
      {
        id: 'food-breakfast',
        tier: 1,
        scene: '🌅🍌🎒',
        pic: { bg: 'kitchen', cast: [{ e: '👩', size: 'l', say: { en: 'Quick, we need to go soon!', vi: 'Nhanh lên con, sắp phải đi rồi!' } }, { e: '🧒', you: true, think: '🎒' }] },
        q: {
          en: "It's a school morning, and you're running a little late. You don't feel like eating. What should you do?",
          vi: 'Sáng nay đi học, con hơi muộn một chút. Con chưa muốn ăn. Con nên làm gì?'
        },
        choices: [
          {
            e: '🍌',
            en: 'Eat a quick breakfast, like a banana and some bread',
            vi: 'Ăn sáng nhanh, như một quả chuối và ít bánh mì',
            v: 'best',
            why: {
              en: 'Breakfast gives your body and brain energy for learning and playing all morning.',
              vi: 'Bữa sáng cho cơ thể và đầu óc năng lượng để học và chơi suốt buổi sáng.'
            }
          },
          {
            e: '⏰',
            en: 'Skip breakfast and wait for recess',
            vi: 'Bỏ bữa sáng, đợi tới giờ ra chơi',
            v: 'no',
            why: {
              en: 'Recess is a long way off. Without breakfast, you might feel tired or grumpy in class.',
              vi: 'Còn lâu mới tới giờ ra chơi. Không ăn sáng, con có thể thấy mệt hoặc khó chịu trong lớp.'
            }
          },
          {
            e: '🍬',
            en: 'Grab some sweets to eat on the way',
            vi: 'Cầm theo mấy viên kẹo ăn dọc đường',
            v: 'no',
            why: {
              en: "Sweets give a quick burst, but you'll soon feel hungry again. A real breakfast keeps you going longer.",
              vi: 'Kẹo cho con chút năng lượng nhanh, nhưng chẳng mấy chốc lại đói. Một bữa sáng thật sự giúp con khoẻ lâu hơn.'
            }
          }
        ],
        lesson: {
          en: 'Start the day with breakfast. Even a quick one gives you energy to learn and play.',
          vi: 'Bắt đầu ngày mới bằng bữa sáng. Dù ăn nhanh cũng cho con năng lượng để học và chơi.'
        }
      },
      {
        id: 'food-at-table',
        tier: 1,
        scene: '🍚🪑🏃',
        pic: { bg: 'home', cast: [{ e: '👩', size: 'l', say: { en: 'Dinner time!', vi: 'Ăn cơm thôi cả nhà!' } }, { e: '🧒', you: true, think: '🏃🍚' }], props: ['🍚'] },
        q: {
          en: 'It is dinner time. You want to carry your bowl and walk around while you eat. What should you do?',
          vi: 'Tới giờ ăn tối. Con muốn bưng bát đi vòng vòng, vừa đi vừa ăn. Con nên làm gì?'
        },
        choices: [
          {
            e: '🪑',
            en: 'Sit at the table and eat with your family',
            vi: 'Ngồi vào bàn ăn cùng cả nhà',
            v: 'best',
            why: {
              en: 'Sitting down helps you chew slowly and safely, and you get to chat with your family.',
              vi: 'Ngồi ăn giúp con nhai chậm và an toàn, lại được trò chuyện cùng cả nhà.'
            }
          },
          {
            e: '🏃',
            en: 'Run around and play between mouthfuls',
            vi: 'Vừa chạy chơi vừa ăn từng miếng',
            v: 'no',
            why: {
              en: 'Running with food in your mouth can make you choke. Sit down to eat, and play when you have finished.',
              vi: 'Vừa chạy vừa ăn dễ bị hóc, sặc. Con ngồi ăn xong rồi hẵng đi chơi nhé.'
            }
          },
          {
            e: '🛋️',
            en: 'Eat on the sofa with your toys',
            vi: 'Ngồi ăn trên ghế sofa với đồ chơi',
            v: 'ok',
            why: {
              en: 'At least you are sitting down. At the table, you can focus on your food and eat together with everyone.',
              vi: 'Ít nhất con đã ngồi rồi. Ngồi vào bàn thì con tập trung ăn hơn và được ăn cùng mọi người.'
            }
          }
        ],
        lesson: {
          en: 'Sit at the table to eat. Chew well, and play when you have finished.',
          vi: 'Ngồi vào bàn để ăn. Nhai kỹ, ăn xong rồi mới chơi.'
        }
      },
      {
        id: 'food-new-taste',
        tier: 2,
        scene: '🍽️🥬🤔',
        value: 'respect',
        pic: { bg: 'kitchen', cast: [{ e: '👵', size: 'l', say: { en: 'Try my new vegetable dish!', vi: 'Cháu ăn thử món rau bà nấu nhé!' } }, { e: '🧒', you: true, think: '🥬🤔' }] },
        q: {
          en: 'Grandma made a vegetable dish you have never tried. It looks a bit strange to you. What do you do?',
          vi: 'Bà nấu một món rau con chưa ăn bao giờ. Con thấy trông hơi lạ. Con làm gì?'
        },
        choices: [
          {
            e: '😋',
            en: 'Take a small bite to try it',
            vi: 'Ăn thử một miếng nhỏ',
            v: 'best',
            why: {
              en: "Tasting something new is brave! It's okay if you don't love it yet. Tastes can change after a few tries.",
              vi: 'Dám thử món mới là dũng cảm đấy! Chưa thích cũng không sao. Ăn thử vài lần, có khi con sẽ thấy ngon.'
            }
          },
          {
            e: '🤢',
            en: "Say 'Yuck!' and push the plate away",
            vi: "Kêu 'Eo ơi!' và đẩy đĩa ra",
            v: 'no',
            why: {
              en: "Grandma cooked it with love, so 'yuck' could hurt her feelings. You can say, 'I'll try a little bit.'",
              vi: "Bà nấu bằng cả tấm lòng, nói 'eo ơi' có thể làm bà buồn. Con có thể nói: 'Con ăn thử một chút ạ.'"
            }
          },
          {
            e: '🙈',
            en: 'Hide it under your rice',
            vi: 'Giấu rau xuống dưới cơm',
            v: 'no',
            why: {
              en: 'If you hide it, you never find out whether you like it! Try one small bite instead.',
              vi: 'Giấu đi thì con sẽ không bao giờ biết mình có thích không! Con thử một miếng nhỏ nhé.'
            }
          }
        ],
        lesson: {
          en: "Try a small bite of new foods. If you don't like it yet, that's okay. Say 'No, thank you' kindly.",
          vi: "Gặp món mới thì thử một miếng nhỏ. Nếu chưa thích cũng không sao, con lễ phép nói 'Con xin thôi ạ'."
        }
      },
      {
        id: 'food-healthy-plate',
        tier: 2,
        scene: '🍽️🥦🍚',
        pic: { bg: 'kitchen', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '🍽️❓' }], props: ['🍚', '🥦', '🐟'] },
        q: {
          en: 'You are helping Mummy fill your plate for dinner. Which plate gives your body what it needs?',
          vi: 'Con giúp mẹ lấy đồ ăn vào đĩa cho bữa tối. Đĩa nào cho cơ thể con đủ những gì cần?'
        },
        choices: [
          {
            e: '🥗',
            en: 'Half vegetables and fruit, some rice, some fish or tofu',
            vi: 'Một nửa là rau và trái cây, một ít cơm, một ít cá hoặc đậu phụ',
            v: 'best',
            why: {
              en: "That's a healthy plate: half fruit and vegetables, a quarter rice, and a quarter fish, meat or tofu.",
              vi: 'Đó là đĩa ăn lành mạnh: một nửa rau và trái cây, một phần tư cơm, một phần tư cá, thịt hoặc đậu phụ.'
            }
          },
          {
            e: '🍚',
            en: 'A big pile of rice and nothing else',
            vi: 'Một đống cơm thật to, không có gì khác',
            v: 'no',
            why: {
              en: 'Rice gives you energy, but your body also needs vegetables, fruit, and fish, meat or tofu to grow strong.',
              vi: 'Cơm cho con năng lượng, nhưng cơ thể còn cần rau, trái cây và cá, thịt hay đậu phụ để lớn khoẻ.'
            }
          },
          {
            e: '🍗',
            en: 'Only chicken nuggets and fries',
            vi: 'Chỉ có gà viên chiên và khoai tây chiên',
            v: 'no',
            why: {
              en: 'Those are tasty sometimes foods! But a plate needs colourful vegetables too. Add some greens or carrots.',
              vi: 'Mấy món đó ngon, thỉnh thoảng ăn cũng được! Nhưng đĩa ăn cần có rau củ nhiều màu nữa. Con thêm ít rau xanh hay cà rốt nhé.'
            }
          }
        ],
        lesson: {
          en: 'A healthy plate: half fruit and vegetables, a quarter rice or bread, a quarter fish, meat, eggs or tofu.',
          vi: 'Đĩa ăn lành mạnh: một nửa rau và trái cây, một phần tư cơm hoặc bánh mì, một phần tư cá, thịt, trứng hoặc đậu phụ.'
        }
      },
      {
        id: 'food-party-sweets',
        tier: 3,
        scene: '🎂🍬🎈',
        pic: { bg: 'party', cast: [{ e: '🧒', you: true, think: '🍬🤔' }, { e: '🧒' }], props: ['🍬', '🍭'] },
        q: {
          en: "At a birthday party, there's a big bowl of sweets. You've already had some cake. What do you do?",
          vi: 'Ở tiệc sinh nhật có một bát kẹo to. Con đã ăn bánh kem rồi. Con làm gì?'
        },
        choices: [
          {
            e: '🍬',
            en: 'Enjoy one or two, then go and play',
            vi: 'Ăn một hai viên cho vui, rồi đi chơi',
            v: 'best',
            why: {
              en: 'Treats are part of the fun at a party. A little is enough, and it is kinder to your tummy and teeth.',
              vi: 'Ăn chút đồ ngọt cũng là niềm vui của bữa tiệc. Một chút là đủ, như vậy bụng và răng của con cũng dễ chịu.'
            }
          },
          {
            e: '🫙',
            en: 'Fill your pockets so you can eat them all later',
            vi: 'Nhét đầy túi để lát nữa ăn hết',
            v: 'no',
            why: {
              en: 'Lots of sweets can give you a tummy ache and are hard on your teeth. Leave some for the other children too.',
              vi: 'Ăn nhiều kẹo dễ đau bụng và không tốt cho răng. Để phần cho các bạn khác nữa nhé.'
            }
          },
          {
            e: '🙅',
            en: "Don't have any at all, because sweets are bad",
            vi: 'Không ăn viên nào, vì kẹo là đồ xấu',
            v: 'ok',
            why: {
              en: "Saying no thanks is fine! But sweets aren't 'bad'. They are a sometimes food, and a little at a party is okay.",
              vi: "Không ăn cũng được! Nhưng kẹo không phải đồ 'xấu', chỉ là món thỉnh thoảng mới ăn. Ở tiệc ăn một chút cũng không sao."
            }
          }
        ],
        lesson: {
          en: 'Sweets are a sometimes treat. Enjoy a little, then drink water and play!',
          vi: 'Đồ ngọt là món thỉnh thoảng mới ăn. Ăn một chút cho vui, rồi uống nước và đi chơi!'
        }
      }
    ]
  },

  // ───────────────────────────── Sleep and rest ─────────────────────────────
  {
    id: 'life.sleep-rest',
    world: 'healthy',
    icon: '😴',
    title: 'Sleep and rest',
    vi: 'Ngủ đủ, nghỉ ngơi',
    goal: 'Con hiểu cơ thể cần ngủ khoảng 10–11 tiếng mỗi đêm, biết đi ngủ đúng giờ, có nếp sinh hoạt nhẹ nhàng trước khi ngủ và biết nghỉ ngơi khi mệt.',
    talk: [
      'Tối nay mấy giờ con đi ngủ để sáng mai dậy thật khoẻ?',
      'Trước khi ngủ, việc gì giúp con thấy dễ chịu và thư giãn?',
      'Hôm nào con ngủ muộn, sáng hôm sau con thấy thế nào?'
    ],
    scenarios: [
      {
        id: 'sleep-bedtime-blocks',
        tier: 1,
        scene: '🧱🌙🛏️',
        pic: { bg: 'bedroom', cast: [{ e: '👨', size: 'l', x: 22, say: { en: "It's bedtime!", vi: 'Đến giờ đi ngủ rồi!' } }, { e: '🧒', you: true, x: 45, think: '🧱' }], props: ['🧱'] },
        q: {
          en: "It's bedtime, but you are in the middle of building a tall block tower. What do you do?",
          vi: 'Đến giờ đi ngủ rồi, nhưng con đang xếp dở một toà tháp đồ chơi thật cao. Con làm gì?'
        },
        choices: [
          {
            e: '🛏️',
            en: 'Leave it somewhere safe and finish it tomorrow',
            vi: 'Để tháp ở chỗ an toàn, mai xếp tiếp',
            v: 'best',
            why: {
              en: 'Your tower can wait. Sleep helps your body grow and your brain remember what you learned today.',
              vi: 'Toà tháp có thể chờ được. Giấc ngủ giúp cơ thể con lớn lên và giúp đầu óc nhớ những gì đã học hôm nay.'
            }
          },
          {
            e: '🧱',
            en: "Keep building until it's finished, however long it takes",
            vi: 'Cứ xếp tiếp đến khi xong, lâu mấy cũng được',
            v: 'no',
            why: {
              en: 'Staying up late means less sleep, and tomorrow you might feel tired and grumpy. The blocks will still be there.',
              vi: 'Thức khuya thì con ngủ ít đi, và mai con có thể thấy mệt, cáu kỉnh. Đồ chơi vẫn nằm đó chờ con mà.'
            }
          },
          {
            e: '⏰',
            en: 'Ask for five more minutes, then five more',
            vi: 'Xin thêm năm phút, rồi lại năm phút nữa',
            v: 'no',
            why: {
              en: 'Asking again and again pushes bedtime later and later. Say goodnight to your tower and hop into bed.',
              vi: 'Xin thêm mãi thì giờ ngủ cứ lùi dần. Con chúc toà tháp ngủ ngon rồi lên giường nhé.'
            }
          }
        ],
        lesson: {
          en: 'Go to bed on time. Children your age need about 10 to 11 hours of sleep.',
          vi: 'Đi ngủ đúng giờ. Trẻ ở tuổi con cần ngủ khoảng 10 đến 11 tiếng mỗi đêm.'
        }
      },
      {
        id: 'sleep-quiet-time',
        tier: 1,
        scene: '😫🛋️📚',
        pic: { bg: 'home', cast: [{ e: '👩', size: 'l', say: { en: "Let's have some quiet time.", vi: 'Mình nghỉ yên lặng một chút nhé.' } }, { e: '🧒', you: true, think: '😫' }] },
        q: {
          en: 'After a busy morning out, you feel tired and grumpy. Mummy says it is quiet time. What do you do?',
          vi: 'Sau một buổi sáng đi chơi bận rộn, con thấy mệt và cáu kỉnh. Mẹ bảo đến giờ nghỉ yên lặng. Con làm gì?'
        },
        choices: [
          {
            e: '📚',
            en: 'Lie down or look at a book quietly for a while',
            vi: 'Nằm nghỉ hoặc xem sách yên lặng một lúc',
            v: 'best',
            why: {
              en: "Quiet rest gives your body and your feelings a break. You'll soon feel ready to play again.",
              vi: 'Nghỉ ngơi yên lặng giúp cơ thể và cảm xúc được thư giãn. Lát nữa con sẽ lại có sức để chơi.'
            }
          },
          {
            e: '🏃',
            en: "Keep running around, because you're not tired!",
            vi: 'Tiếp tục chạy nhảy, vì con có mệt đâu!',
            v: 'no',
            why: {
              en: 'Sometimes being tired feels like being grumpy. A little rest can help you feel better.',
              vi: 'Đôi khi mệt lại khiến mình thấy cáu kỉnh. Nghỉ một chút sẽ giúp con dễ chịu hơn.'
            }
          },
          {
            e: '😤',
            en: "Shout 'No!' and stomp off",
            vi: "Hét 'Không!' rồi dậm chân bỏ đi",
            v: 'no',
            why: {
              en: "It's okay to feel grumpy when you're tired. Take a deep breath, and try resting for a little while.",
              vi: 'Mệt thì thấy cáu là chuyện bình thường. Con hít một hơi thật sâu, rồi thử nằm nghỉ một lúc nhé.'
            }
          }
        ],
        lesson: {
          en: 'Feeling tired or grumpy? Some quiet rest can help your body and your mood.',
          vi: 'Thấy mệt hay cáu kỉnh? Nghỉ ngơi yên lặng một lúc giúp cơ thể và tâm trạng tốt hơn.'
        }
      },
      {
        id: 'sleep-yawning',
        tier: 2,
        scene: '🏫🥱😴',
        pic: { bg: 'classroom', cast: [{ e: '👩‍🏫', size: 'l' }, { e: '🧒', you: true, think: '🥱' }, { e: '🧒' }] },
        q: {
          en: 'You went to bed late last night. Now you keep yawning in class. What can you do tonight?',
          vi: 'Tối qua con đi ngủ muộn. Giờ ngồi trong lớp con cứ ngáp mãi. Tối nay con có thể làm gì?'
        },
        choices: [
          {
            e: '🛏️',
            en: 'Go to bed on time, so you wake up fresh',
            vi: 'Đi ngủ đúng giờ để sáng mai dậy thật khoẻ',
            v: 'best',
            why: {
              en: 'A good night of sleep helps you listen, learn and feel happy at school.',
              vi: 'Ngủ đủ giấc giúp con chú ý nghe giảng, học tốt và vui vẻ ở trường.'
            }
          },
          {
            e: '🌙',
            en: "Stay up late again, because you'll get used to it",
            vi: 'Lại thức khuya, rồi sẽ quen thôi',
            v: 'no',
            why: {
              en: "Your body can't get used to too little sleep. Going to bed on time is what really helps.",
              vi: 'Cơ thể không thể quen với việc ngủ quá ít. Đi ngủ đúng giờ mới thật sự giúp con.'
            }
          },
          {
            e: '😌',
            en: 'Sit and rest quietly at recess',
            vi: 'Ngồi nghỉ yên lặng vào giờ ra chơi',
            v: 'ok',
            why: {
              en: 'Resting helps a little. But a good night of sleep is what your body really needs.',
              vi: 'Nghỉ một chút cũng đỡ. Nhưng điều cơ thể con thật sự cần là một đêm ngủ ngon.'
            }
          }
        ],
        lesson: {
          en: 'Tired in class? Your body is asking for more sleep. Go to bed on time tonight.',
          vi: 'Mệt trong lớp? Cơ thể đang xin con ngủ thêm đấy. Tối nay đi ngủ đúng giờ nhé.'
        }
      },
      {
        id: 'sleep-routine',
        tier: 2,
        scene: '🛁🪥📖',
        pic: { bg: 'bedroom', cast: [{ e: '🧒', you: true, x: 40, think: '🌙❓' }] },
        q: {
          en: 'It is almost bedtime. Which plan helps your body get ready to sleep?',
          vi: 'Sắp tới giờ đi ngủ. Việc nào giúp cơ thể con sẵn sàng cho giấc ngủ?'
        },
        choices: [
          {
            e: '📖',
            en: 'Bath, brush teeth, a story, then lights off',
            vi: 'Tắm, đánh răng, nghe kể chuyện, rồi tắt đèn',
            v: 'best',
            why: {
              en: 'A calm routine every night tells your body it is time to slow down and sleep.',
              vi: 'Tối nào cũng làm những việc nhẹ nhàng giống nhau sẽ báo cho cơ thể biết đã tới lúc thư giãn và ngủ.'
            }
          },
          {
            e: '🤸',
            en: 'A wild jumping game on the bed',
            vi: 'Chơi nhảy nhót trên giường thật vui',
            v: 'no',
            why: {
              en: 'Jumping wakes your body up instead of calming it down. Save active games for the daytime.',
              vi: 'Nhảy nhót làm cơ thể tỉnh táo hơn chứ không dịu xuống. Để dành trò chơi vận động cho ban ngày nhé.'
            }
          },
          {
            e: '🍪',
            en: "A big snack in bed after you've brushed your teeth",
            vi: 'Ăn một bữa no trên giường sau khi đã đánh răng',
            v: 'no',
            why: {
              en: 'Food eaten after brushing stays on your teeth all night. If you are hungry, have a small snack before you brush.',
              vi: 'Ăn sau khi đánh răng thì thức ăn sẽ bám trên răng cả đêm. Nếu đói, con ăn chút gì nhẹ trước khi đánh răng nhé.'
            }
          }
        ],
        lesson: {
          en: 'A calm bedtime routine (bath, teeth, story, lights off) helps you fall asleep.',
          vi: 'Nếp sinh hoạt nhẹ nhàng trước khi ngủ (tắm, đánh răng, nghe chuyện, tắt đèn) giúp con dễ ngủ.'
        }
      },
      {
        id: 'sleep-cant-sleep',
        tier: 2,
        scene: '🛏️🌙👀',
        pic: { bg: 'bedroom', cast: [{ e: '🧒', you: true, x: 72, up: 10, think: '👀' }] },
        q: {
          en: "You are in bed, but you can't fall asleep. What can you do?",
          vi: 'Con nằm trên giường mà mãi không ngủ được. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🌬️',
            en: 'Close your eyes, lie still and take slow, deep breaths',
            vi: 'Nhắm mắt, nằm yên và hít thở thật chậm, thật sâu',
            v: 'best',
            why: {
              en: 'Slow breaths help your body relax. Sleep often comes when you lie quietly.',
              vi: 'Hít thở chậm giúp cơ thể thư giãn. Cứ nằm yên lặng, giấc ngủ sẽ tới.'
            }
          },
          {
            e: '🧸',
            en: 'Get up and play with your toys',
            vi: 'Dậy chơi đồ chơi',
            v: 'no',
            why: {
              en: 'Playing wakes your brain up even more. Stay in bed and let your body rest.',
              vi: 'Chơi đồ chơi làm đầu óc càng tỉnh táo hơn. Con nằm yên trên giường cho cơ thể nghỉ ngơi nhé.'
            }
          },
          {
            e: '🦘',
            en: 'Jump up and down on the bed to get tired',
            vi: 'Nhảy trên giường cho mệt để dễ ngủ',
            v: 'no',
            why: {
              en: 'Jumping makes your body more awake, not sleepier. Lie still and breathe slowly instead.',
              vi: 'Nhảy làm cơ thể tỉnh hơn chứ không buồn ngủ hơn. Con nằm yên và thở thật chậm nhé.'
            }
          }
        ],
        lesson: {
          en: "Can't sleep? Lie still, close your eyes and breathe slowly. If something worries you, tell your grown-up.",
          vi: 'Không ngủ được? Nằm yên, nhắm mắt và thở thật chậm. Nếu có điều gì làm con lo, hãy kể với bố mẹ.'
        }
      },
      {
        id: 'sleep-visitors',
        tier: 3,
        scene: '🏠👨‍👩‍👧‍👦🌙',
        value: 'respect',
        pic: { bg: 'home', cast: [{ e: '👵', size: 'l' }, { e: '👨', size: 'l', say: { en: 'Ha ha, what a funny story!', vi: 'Ha ha, chuyện vui quá!' } }, { e: '🧒', you: true, think: '🕘😴' }] },
        q: {
          en: 'Relatives are visiting, and everyone is chatting happily. It is already past your bedtime. What should you do?',
          vi: 'Họ hàng tới chơi, mọi người đang trò chuyện vui vẻ. Đã quá giờ đi ngủ của con rồi. Con nên làm gì?'
        },
        choices: [
          {
            e: '👋',
            en: 'Say goodnight to everyone and get ready for bed',
            vi: 'Chúc mọi người ngủ ngon rồi đi chuẩn bị ngủ',
            v: 'best',
            why: {
              en: 'Saying goodnight is polite, and you still get the sleep your body needs.',
              vi: 'Chào mọi người là lễ phép, mà con vẫn ngủ đủ giấc như cơ thể cần.'
            }
          },
          {
            e: '🙈',
            en: 'Hide behind the sofa so nobody notices the time',
            vi: 'Trốn sau ghế sofa để không ai để ý tới giờ',
            v: 'no',
            why: {
              en: "Being with everyone is fun, but your body still needs its sleep. You'll get to see them again.",
              vi: 'Ở cùng mọi người thì vui thật, nhưng cơ thể con vẫn cần ngủ. Con sẽ còn được gặp mọi người nữa mà.'
            }
          },
          {
            e: '🙏',
            en: "Politely ask if you can stay up a bit, as it's a special night",
            vi: 'Lễ phép xin thức thêm một chút, vì tối nay đặc biệt',
            v: 'ok',
            why: {
              en: 'Asking politely is good, and your grown-up decides. On most nights, going to bed on time is best.',
              vi: 'Hỏi lễ phép là tốt, và bố mẹ sẽ quyết định. Hầu hết các tối, đi ngủ đúng giờ vẫn là tốt nhất.'
            }
          }
        ],
        lesson: {
          en: 'Even on fun nights, bedtime matters. Say goodnight politely and get the sleep you need.',
          vi: 'Kể cả những tối vui, giờ ngủ vẫn quan trọng. Chào mọi người lễ phép rồi đi ngủ cho đủ giấc.'
        }
      }
    ]
  },

  // ───────────────────────────── Move and play ─────────────────────────────
  {
    id: 'life.move-play',
    world: 'healthy',
    icon: '🤸',
    title: 'Move and play',
    vi: 'Vận động mỗi ngày',
    goal: 'Con biết mỗi ngày cần chạy nhảy vui chơi, biết đứng dậy vươn vai khi ngồi lâu, khởi động trước khi chạy, và chơi ngoài trời an toàn khi trời nắng nóng.',
    talk: [
      'Hôm nay con đã vận động những gì? Trò nào làm con thấy vui nhất?',
      'Trời mưa không ra ngoài được thì ở nhà mình có thể chơi trò vận động gì?',
      'Đi chơi ngoài nắng, mình cần mang theo những gì?'
    ],
    scenarios: [
      {
        id: 'move-play-outside',
        tier: 1,
        scene: '🏫🛝☀️',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, x: 60, think: '🤔' }], props: ['🎒'] },
        q: {
          en: 'School is over, and you have some free time this afternoon. What is a great way to spend some of it?',
          vi: 'Tan học rồi, chiều nay con có thời gian rảnh. Cách nào hay để dành một phần thời gian đó?'
        },
        choices: [
          {
            e: '🛝',
            en: 'Play at the playground: run, climb and swing',
            vi: 'Ra sân chơi: chạy, leo trèo, đánh đu',
            v: 'best',
            why: {
              en: 'Moving and playing every day makes your heart, muscles and bones strong. And it is fun!',
              vi: 'Mỗi ngày chạy nhảy vui chơi giúp tim, cơ và xương của con khoẻ mạnh. Lại còn vui nữa!'
            }
          },
          {
            e: '🛋️',
            en: 'Sit on the sofa all afternoon',
            vi: 'Ngồi trên ghế sofa cả buổi chiều',
            v: 'no',
            why: {
              en: 'Resting is nice for a little while, but your body needs to move and play every day too.',
              vi: 'Nghỉ một lúc thì dễ chịu, nhưng mỗi ngày cơ thể con cũng cần được vận động và vui chơi.'
            }
          },
          {
            e: '🎨',
            en: 'Draw quietly at the table',
            vi: 'Ngồi vẽ tranh yên lặng',
            v: 'ok',
            why: {
              en: 'Drawing is a lovely thing to do. Try to spend some time running and playing today as well.',
              vi: 'Vẽ tranh là việc rất hay. Hôm nay con cũng nên dành thời gian chạy nhảy vui chơi nữa nhé.'
            }
          }
        ],
        lesson: {
          en: 'Move and play every day: run, jump, climb, dance. It makes your body strong.',
          vi: 'Mỗi ngày đều vận động và vui chơi: chạy, nhảy, leo trèo, nhảy múa. Cơ thể con sẽ khoẻ mạnh.'
        }
      },
      {
        id: 'move-hot-sun',
        tier: 1,
        scene: '☀️🧢💧',
        pic: { bg: 'park', cast: [{ e: '🧒', you: true, think: '🥵' }], props: [{ e: '☀️', x: 82, y: 14, size: 'm' }] },
        q: {
          en: 'You are going to play at the park on a hot, sunny afternoon. What should you take?',
          vi: 'Con sắp ra công viên chơi vào một buổi chiều nắng nóng. Con nên mang theo gì?'
        },
        choices: [
          {
            e: '🧢',
            en: 'A hat and a water bottle, and take breaks in the shade',
            vi: 'Mũ và bình nước, và nghỉ trong bóng râm',
            v: 'best',
            why: {
              en: 'A hat shades your head, water keeps you cool inside, and the shade gives your body a rest.',
              vi: 'Mũ che đầu, nước giúp cơ thể mát từ bên trong, còn bóng râm cho con chỗ nghỉ.'
            }
          },
          {
            e: '🍦',
            en: "Nothing. You'll buy ice cream if you get hot",
            vi: 'Không cần gì, nóng thì mua kem ăn',
            v: 'no',
            why: {
              en: 'Ice cream is a yummy treat, but on a hot day your body needs water. Take your bottle and a hat.',
              vi: 'Kem thì ngon thật, nhưng trời nóng cơ thể cần nước. Con mang theo bình nước và mũ nhé.'
            }
          },
          {
            e: '🏃',
            en: 'Nothing. Just play in the sun without stopping',
            vi: 'Không cần gì, cứ chơi dưới nắng không nghỉ',
            v: 'no',
            why: {
              en: 'Too much sun without breaks can make you feel dizzy and unwell. Rest in the shade and drink water often.',
              vi: 'Chơi lâu dưới nắng không nghỉ dễ làm con chóng mặt, mệt mỏi. Con nghỉ trong bóng râm và uống nước thường xuyên nhé.'
            }
          }
        ],
        lesson: {
          en: 'Hot day? Wear a hat, drink water often and take breaks in the shade.',
          vi: 'Trời nắng nóng? Đội mũ, uống nước thường xuyên và nghỉ trong bóng râm.'
        }
      },
      {
        id: 'move-stretch-break',
        tier: 1,
        scene: '✏️🪑🙆',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, x: 60, think: '😣' }], props: ['📚', '✏️'] },
        q: {
          en: 'You have been sitting and doing homework for a long time. Your body feels stiff. What should you do?',
          vi: 'Con ngồi làm bài tập lâu rồi. Người con thấy mỏi cứng. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙆',
            en: 'Stand up, stretch your arms high and wiggle for a minute',
            vi: 'Đứng dậy, vươn tay thật cao và lắc lư người một phút',
            v: 'best',
            why: {
              en: "A quick stretch wakes your body up, and you'll feel ready to keep going.",
              vi: 'Vươn vai một chút giúp cơ thể tỉnh táo, rồi con sẽ thấy sẵn sàng học tiếp.'
            }
          },
          {
            e: '🫠',
            en: 'Slump down lower in your chair',
            vi: 'Ngồi tụt xuống ghế cho đỡ mỏi',
            v: 'no',
            why: {
              en: 'Slumping can make you feel even stiffer. A short stretch break helps much more.',
              vi: 'Ngồi tụt xuống càng làm con mỏi hơn. Đứng dậy vươn vai một chút sẽ đỡ hơn nhiều.'
            }
          },
          {
            e: '🏃',
            en: 'Stop your homework and go out to play for the rest of the day',
            vi: 'Bỏ bài tập, ra ngoài chơi luôn cả buổi',
            v: 'ok',
            why: {
              en: 'Moving is a good idea. For now, a short stretch break is enough, then you can finish your homework and play.',
              vi: 'Vận động là ý hay. Nhưng lúc này nghỉ vươn vai một chút là đủ, rồi con làm nốt bài tập và đi chơi.'
            }
          }
        ],
        lesson: {
          en: 'Sitting for a long time? Take a short break to stand up, stretch and move.',
          vi: 'Ngồi lâu? Nghỉ một chút để đứng dậy, vươn vai và vận động.'
        }
      },
      {
        id: 'move-rainy-day',
        tier: 2,
        scene: '⛈️🏠💃',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, x: 55, think: '😞' }], props: [{ e: '⛈️', x: 79, y: 22, size: 'm' }] },
        q: {
          en: "It's raining and thundering, so you can't play outside today. What can you do?",
          vi: 'Trời đang mưa và có sấm, hôm nay con không ra ngoài chơi được. Con có thể làm gì?'
        },
        choices: [
          {
            e: '💃',
            en: 'Dance, do star jumps or play an active game indoors',
            vi: 'Nhảy múa, bật nhảy hoặc chơi trò vận động trong nhà',
            v: 'best',
            why: {
              en: "You can move your body indoors too. Just make sure there's space and nothing to bump into.",
              vi: 'Ở trong nhà con vẫn vận động được. Chỉ cần chọn chỗ rộng, không có gì dễ va vào.'
            }
          },
          {
            e: '☔',
            en: 'Go out and play in the storm anyway',
            vi: 'Cứ ra ngoài chơi dưới trời giông',
            v: 'no',
            why: {
              en: 'When there is thunder, it is safest to stay indoors. Find a fun way to move inside instead.',
              vi: 'Khi có sấm sét, ở trong nhà là an toàn nhất. Con tìm trò vận động vui ở trong nhà nhé.'
            }
          },
          {
            e: '⏳',
            en: 'Sit and wait all day for the rain to stop',
            vi: 'Ngồi chờ cả ngày cho tạnh mưa',
            v: 'ok',
            why: {
              en: "Waiting is okay, but you don't have to! There are lots of ways to move and have fun indoors.",
              vi: 'Chờ cũng được, nhưng không cần đâu! Có nhiều cách vận động vui ở trong nhà mà.'
            }
          }
        ],
        lesson: {
          en: 'Rainy day? Keep moving indoors: dance, stretch or jump in a safe space.',
          vi: 'Trời mưa? Vẫn vận động trong nhà: nhảy múa, vươn vai, bật nhảy ở chỗ an toàn.'
        }
      },
      {
        id: 'move-warm-up',
        tier: 2,
        scene: '🏃🏁🤸',
        pic: { bg: 'schoolyard', cast: [{ e: '👩‍🏫', size: 'l', say: { en: 'Races start soon!', vi: 'Sắp tới giờ chạy đua rồi!' } }, { e: '🧒', you: true, think: '🏁' }, { e: '🧒' }] },
        q: {
          en: "It's Sports Day! Your race starts soon. What should you do first?",
          vi: 'Hôm nay là Ngày hội thể thao! Sắp tới lượt con chạy đua. Con nên làm gì trước?'
        },
        choices: [
          {
            e: '🤸',
            en: 'Warm up with your class: jog gently and swing your arms',
            vi: 'Khởi động cùng lớp: chạy chậm và xoay tay',
            v: 'best',
            why: {
              en: 'A warm-up gets your muscles ready, so you can run your best and are less likely to get hurt.',
              vi: 'Khởi động giúp cơ bắp sẵn sàng, để con chạy tốt nhất và ít bị đau hơn.'
            }
          },
          {
            e: '💨',
            en: 'Sprint as fast as you can straight away to practise',
            vi: 'Chạy hết tốc lực ngay để tập',
            v: 'no',
            why: {
              en: 'Going full speed before your muscles are warm can strain them. Start gently, then go faster.',
              vi: 'Chạy hết sức khi cơ chưa được khởi động dễ bị căng cơ. Con bắt đầu nhẹ nhàng rồi mới tăng tốc.'
            }
          },
          {
            e: '🪑',
            en: 'Sit and wait quietly until it is your turn',
            vi: 'Ngồi yên chờ tới lượt mình',
            v: 'ok',
            why: {
              en: 'Waiting calmly is fine, but your muscles need waking up first. Join the warm-up!',
              vi: 'Ngồi chờ ngoan là tốt, nhưng cơ bắp cần được đánh thức trước đã. Con khởi động cùng các bạn nhé!'
            }
          }
        ],
        lesson: {
          en: 'Before a race or a game, warm up gently. Your body will thank you!',
          vi: 'Trước khi chạy đua hay chơi thể thao, hãy khởi động nhẹ nhàng. Cơ thể sẽ cảm ơn con!'
        }
      },
      {
        id: 'move-not-fastest',
        tier: 3,
        scene: '🏃🏃🙂',
        value: 'resilience',
        pic: { bg: 'playground', cast: [{ e: '🧒', x: 60, say: { en: 'I won again!', vi: 'Tớ lại thắng rồi!' } }, { e: '🧒', you: true, x: 82, think: '😞' }] },
        q: {
          en: 'You and {friend} race across the playground. {friend} wins every time. You start to feel like giving up. What do you do?',
          vi: 'Con và {friend} chạy đua ở sân chơi. Lần nào {friend} cũng thắng. Con bắt đầu muốn bỏ cuộc. Con làm gì?'
        },
        choices: [
          {
            e: '😄',
            en: 'Keep playing for fun. You get stronger every time you run',
            vi: 'Cứ chơi tiếp cho vui. Mỗi lần chạy con lại khoẻ hơn',
            v: 'best',
            why: {
              en: 'Moving is about having fun and getting stronger, not always winning. Your body learns every time you run.',
              vi: 'Vận động là để vui và khoẻ hơn, không phải lúc nào cũng phải thắng. Mỗi lần chạy, cơ thể con lại tiến bộ.'
            }
          },
          {
            e: '🪑',
            en: 'Give up and sit on the bench',
            vi: 'Bỏ cuộc và ra ghế ngồi',
            v: 'no',
            why: {
              en: "Everyone gets better with practice, and moving is good for you even when you don't win. Keep going!",
              vi: 'Ai cũng tiến bộ khi luyện tập, và vận động luôn tốt cho con dù không thắng. Cố lên nhé!'
            }
          },
          {
            e: '🎯',
            en: 'Ask {friend} to play a different game, like tag',
            vi: 'Rủ {friend} chuyển sang trò khác, như đuổi bắt',
            v: 'ok',
            why: {
              en: "A new game keeps you both moving, which is great. But don't give up on racing: practice makes you faster.",
              vi: 'Chơi trò khác vẫn giúp hai bạn vận động, thế là tốt. Nhưng con đừng bỏ hẳn trò chạy đua nhé: luyện tập sẽ giúp con nhanh hơn.'
            }
          }
        ],
        lesson: {
          en: "You don't have to be the fastest. Moving is about having fun and getting stronger.",
          vi: 'Con không cần phải nhanh nhất. Vận động là để vui và khoẻ mạnh hơn.'
        }
      }
    ]
  },

  // ───────────────────────────── When I feel unwell ─────────────────────────────
  {
    id: 'life.unwell',
    world: 'healthy',
    icon: '🤒',
    title: 'When I feel unwell',
    vi: 'Khi con thấy không khoẻ',
    goal: 'Con biết nói ngay với người lớn khi thấy mệt, ở nhà nghỉ khi bị ốm, không dùng chung cốc khi ốm, và chỉ uống thuốc do bố mẹ hoặc bác sĩ đưa.',
    talk: [
      'Khi con thấy đau bụng hay chóng mặt ở trường, con sẽ nói với ai?',
      'Vì sao khi bị ốm mình nên ở nhà nghỉ chứ không đi học?',
      'Ai là người được đưa thuốc cho con uống?'
    ],
    scenarios: [
      {
        id: 'unwell-tummy-school',
        tier: 1,
        scene: '🏫🤢🙋',
        pic: { bg: 'classroom', cast: [{ e: '👩‍🏫', size: 'l' }, { e: '🧒', you: true, think: '🤢' }, { e: '🧒' }] },
        q: {
          en: 'You are at school, and your tummy starts to hurt a lot. What should you do?',
          vi: 'Con đang ở trường thì bụng bắt đầu đau nhiều. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Tell your teacher right away',
            vi: 'Nói ngay với thầy cô',
            v: 'best',
            why: {
              en: 'Teachers want to know when you feel unwell. They can look after you and call home if needed.',
              vi: 'Thầy cô luôn muốn biết khi con thấy không khoẻ. Thầy cô sẽ chăm sóc con và gọi về nhà nếu cần.'
            }
          },
          {
            e: '🤐',
            en: 'Keep quiet and wait until school ends',
            vi: 'Im lặng và cố chờ đến khi tan học',
            v: 'no',
            why: {
              en: "You don't have to put up with feeling sick on your own. Telling a grown-up gets you help sooner.",
              vi: 'Con không phải chịu đựng một mình khi thấy mệt. Nói với người lớn để được giúp sớm hơn.'
            }
          },
          {
            e: '🚶',
            en: 'Walk out of school to go home by yourself',
            vi: 'Tự đi ra khỏi trường để về nhà',
            v: 'no',
            why: {
              en: 'Never leave school on your own. Tell your teacher, and they will make sure a grown-up takes you home safely.',
              vi: 'Không bao giờ tự rời trường một mình. Con nói với thầy cô, thầy cô sẽ lo cho người lớn đón con về an toàn.'
            }
          }
        ],
        lesson: {
          en: 'Feeling unwell? Tell a grown-up straight away: a teacher at school, or your family at home.',
          vi: 'Thấy không khoẻ? Nói ngay với người lớn: thầy cô ở trường, hoặc bố mẹ ở nhà.'
        }
      },
      {
        id: 'unwell-doctor',
        tier: 1,
        scene: '🩺🧒🗣️',
        pic: { bg: 'clinic', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '😟' }, { e: '🧑‍⚕️', size: 'l', say: { en: 'Where does it hurt?', vi: 'Con đau ở đâu?' } }] },
        q: {
          en: "You are at the clinic with Mummy. The doctor asks, 'Where does it hurt?' What do you do?",
          vi: "Con và mẹ đang ở phòng khám. Bác sĩ hỏi: 'Con đau ở đâu?' Con làm gì?"
        },
        choices: [
          {
            e: '👉',
            en: 'Point to where it hurts and tell the doctor how you feel',
            vi: 'Chỉ vào chỗ đau và kể cho bác sĩ con thấy thế nào',
            v: 'best',
            why: {
              en: 'The more you tell the doctor, the better they can help you feel well again.',
              vi: 'Con kể càng rõ, bác sĩ càng biết cách giúp con mau khoẻ.'
            }
          },
          {
            e: '🙊',
            en: 'Say nothing and hide behind Mummy',
            vi: 'Im lặng và nấp sau lưng mẹ',
            v: 'ok',
            why: {
              en: 'Feeling shy is okay, and Mummy can help. Try to show the doctor where it hurts too.',
              vi: 'Ngại ngùng cũng không sao, mẹ sẽ giúp con. Con thử chỉ cho bác sĩ chỗ đau nữa nhé.'
            }
          },
          {
            e: '🤥',
            en: "Say it doesn't hurt, so you can go home quickly",
            vi: 'Nói là không đau để được về nhà nhanh',
            v: 'no',
            why: {
              en: "If the doctor doesn't know, it's hard for them to help. Telling the truth helps you get better.",
              vi: 'Nếu bác sĩ không biết thì khó giúp con. Nói thật giúp con mau khỏi.'
            }
          }
        ],
        lesson: {
          en: 'Doctors and nurses are helpers. Tell them honestly where it hurts and how you feel.',
          vi: 'Bác sĩ và y tá là người giúp con. Hãy nói thật con đau ở đâu và thấy thế nào.'
        }
      },
      {
        id: 'unwell-stay-home',
        tier: 2,
        scene: '🤒🏠🎉',
        value: 'care',
        pic: { bg: 'bedroom', cast: [{ e: '🧒', you: true, x: 45, think: '🎉' }], props: ['🌡️'] },
        q: {
          en: 'You wake up with a fever and a cough. But today is the class party, and you really want to go! What should you do?',
          vi: 'Con thức dậy thì bị sốt và ho. Nhưng hôm nay lớp có tiệc mà con rất muốn đi! Con nên làm gì?'
        },
        choices: [
          {
            e: '🛌',
            en: 'Tell Mummy and stay home to rest',
            vi: 'Nói với mẹ và ở nhà nghỉ',
            v: 'best',
            why: {
              en: "Resting helps you get better faster, and your friends won't catch your germs. It's okay to feel sad about the party.",
              vi: 'Nghỉ ngơi giúp con mau khỏi, và các bạn không bị lây. Lỡ buổi tiệc thì buồn một chút cũng không sao.'
            }
          },
          {
            e: '🤫',
            en: 'Hide your cough so you can still go',
            vi: 'Giấu chuyện bị ho để vẫn được đi',
            v: 'no',
            why: {
              en: 'Your body needs rest to fight the germs, and your friends could catch them. Tell your grown-up how you feel.',
              vi: 'Cơ thể con cần nghỉ để chống lại vi trùng, và các bạn có thể bị lây. Con nói thật với bố mẹ nhé.'
            }
          },
          {
            e: '🎉',
            en: 'Go to the party, but stay away from your friends',
            vi: 'Vẫn đi dự tiệc, nhưng đứng xa các bạn',
            v: 'no',
            why: {
              en: "With a fever, your body needs rest at home. There will be more parties when you're well!",
              vi: 'Khi bị sốt, cơ thể con cần nghỉ ở nhà. Khỏi ốm rồi sẽ còn nhiều buổi tiệc nữa!'
            }
          }
        ],
        lesson: {
          en: "When you're sick, rest at home. It helps you get better and keeps your friends well.",
          vi: 'Khi bị ốm, con nghỉ ở nhà. Như vậy con mau khỏi và các bạn cũng không bị lây.'
        }
      },
      {
        id: 'unwell-yucky-medicine',
        tier: 2,
        scene: '🥄💊😖',
        pic: { bg: 'home', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '😖' }], props: ['🥄'] },
        q: {
          en: 'The doctor gave you some medicine. It tastes yucky! What should you do?',
          vi: 'Bác sĩ kê thuốc cho con. Thuốc khó uống quá! Con nên làm gì?'
        },
        choices: [
          {
            e: '🥄',
            en: 'Take it with Mummy, the way the doctor said',
            vi: 'Uống cùng mẹ, đúng như bác sĩ dặn',
            v: 'best',
            why: {
              en: 'Medicine helps you get better when you take the right amount at the right time. Mummy knows what the doctor said.',
              vi: 'Thuốc giúp con khỏi bệnh khi uống đúng liều, đúng giờ. Mẹ biết bác sĩ dặn thế nào.'
            }
          },
          {
            e: '🙈',
            en: 'Spit it out or hide it when no one is looking',
            vi: 'Lén nhổ ra hoặc giấu đi khi không ai nhìn',
            v: 'no',
            why: {
              en: "Then the medicine can't help you get better. Tell Mummy it tastes yucky. She may have an idea to help.",
              vi: 'Như vậy thuốc không giúp con khỏi bệnh được. Con nói với mẹ là thuốc khó uống, mẹ sẽ nghĩ cách giúp con.'
            }
          },
          {
            e: '➕',
            en: 'Take some extra so you get better faster',
            vi: 'Uống thêm cho mau khỏi',
            v: 'no',
            why: {
              en: "More medicine doesn't make you better faster. Too much can make you feel sick. Your grown-up gives the right amount.",
              vi: 'Uống nhiều hơn không làm con khỏi nhanh hơn, uống quá liều còn có thể làm con mệt thêm. Bố mẹ sẽ cho con uống đúng liều.'
            }
          }
        ],
        lesson: {
          en: 'Take medicine only from your grown-up, the way the doctor said. Not more, not less.',
          vi: 'Chỉ uống thuốc do bố mẹ đưa, đúng như bác sĩ dặn. Không nhiều hơn, không ít hơn.'
        }
      },
      {
        id: 'unwell-share-cup',
        tier: 2,
        scene: '🤧🥤🧒',
        value: 'care',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🤧' }, { e: '🧒', size: 's', say: { en: 'Can I drink from your cup?', vi: 'Cho em uống chung cốc nhé?' } }], props: ['🥤'] },
        q: {
          en: 'You have a cold. Your little cousin wants to drink from your cup and use your spoon. What should you do?',
          vi: 'Con đang bị cảm. Em họ nhỏ muốn uống chung cốc và dùng chung thìa với con. Con nên làm gì?'
        },
        choices: [
          {
            e: '🥤',
            en: 'Kindly say no and help your cousin get their own cup',
            vi: 'Nhẹ nhàng từ chối và giúp em lấy cốc riêng',
            v: 'best',
            why: {
              en: 'That is caring. Germs from your cold can spread on cups and spoons, so a cup of their own keeps your cousin well.',
              vi: 'Con thật biết quan tâm. Vi trùng cảm có thể lây qua cốc và thìa, nên mỗi người một cốc riêng giúp em khoẻ mạnh.'
            }
          },
          {
            e: '🤝',
            en: "Share them, because it's kind to share",
            vi: 'Cho em dùng chung, vì chia sẻ là tốt mà',
            v: 'no',
            why: {
              en: 'Sharing toys is kind, but sharing cups and spoons when you are sick can pass on your germs.',
              vi: 'Chia sẻ đồ chơi là tốt, nhưng dùng chung cốc, thìa khi đang ốm có thể làm em bị lây.'
            }
          },
          {
            e: '😤',
            en: "Shout 'Go away!' at your cousin",
            vi: "Hét 'Đi ra!' với em",
            v: 'no',
            why: {
              en: "Your cousin just wants to be close to you. You can say kindly, 'I'm sick, so let's use our own cups.'",
              vi: "Em chỉ muốn ở gần con thôi. Con có thể nói nhẹ nhàng: 'Mình đang ốm, mỗi người dùng cốc riêng nhé.'"
            }
          }
        ],
        lesson: {
          en: "When you're sick, don't share cups, bottles or spoons, and cover your coughs to keep others well.",
          vi: 'Khi bị ốm, không dùng chung cốc, bình nước hay thìa, và che miệng khi ho để mọi người không bị lây.'
        }
      },
      {
        id: 'unwell-friend-medicine',
        tier: 3,
        scene: '🤧💊🙅',
        pic: { bg: 'classroom', cast: [{ e: '🧒', you: true, think: '🤧' }, { e: '🧒', say: { en: 'Take one of my medicine sweets!', vi: 'Ăn một viên kẹo thuốc của tớ đi!' } }], props: ['💊'] },
        q: {
          en: "You have a cough at school. {friend} says, 'I have medicine sweets in my bag. Take one, it helps!' What do you do?",
          vi: "Con đang bị ho ở trường. {friend} nói: 'Tớ có kẹo thuốc trong cặp nè. Ăn một viên đi, đỡ lắm!' Con làm gì?"
        },
        choices: [
          {
            e: '🙅',
            en: "Say 'No, thank you' and tell your teacher about your cough",
            vi: "Nói 'Cảm ơn, tớ không ăn đâu' và báo thầy cô là con bị ho",
            v: 'best',
            why: {
              en: '{friend} is being kind, but only your grown-up or a doctor should give you medicine. Your teacher can help.',
              vi: '{friend} muốn giúp con, nhưng chỉ bố mẹ hoặc bác sĩ mới được đưa thuốc cho con. Thầy cô sẽ giúp con.'
            }
          },
          {
            e: '💊',
            en: 'Take one, because {friend} is trying to help',
            vi: 'Lấy một viên, vì {friend} chỉ muốn giúp thôi mà',
            v: 'no',
            why: {
              en: 'It is a kind thought, but medicine that is right for {friend} might not be right for you. Ask a grown-up first.',
              vi: '{friend} có lòng tốt, nhưng thuốc hợp với {friend} chưa chắc đã hợp với con. Con hỏi người lớn trước nhé.'
            }
          },
          {
            e: '🍬',
            en: 'Take a few to share with your other friends',
            vi: 'Lấy mấy viên để chia cho các bạn khác',
            v: 'no',
            why: {
              en: 'Medicine is never for sharing, even when it looks like a sweet. Only grown-ups should give medicine.',
              vi: 'Thuốc không bao giờ để chia nhau, kể cả khi trông giống kẹo. Chỉ người lớn mới được đưa thuốc.'
            }
          }
        ],
        lesson: {
          en: 'Only take medicine from your grown-up or a doctor, never from a friend.',
          vi: 'Chỉ uống thuốc do bố mẹ hoặc bác sĩ đưa, không bao giờ nhận thuốc từ bạn bè.'
        }
      }
    ]
  }
];
