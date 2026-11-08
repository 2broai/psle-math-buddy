// World: road — see README.md in this folder for the format.
export const TOPICS = [
  // ───────────────────────────── Crossing the road ─────────────────────────────
  {
    id: 'life.cross-road',
    world: 'road',
    icon: '🚸',
    title: 'Crossing the road',
    vi: 'Qua đường an toàn',
    goal: 'Con biết nắm tay người lớn, qua đường ở đúng chỗ, chờ đèn hình người xanh, nhìn cả hai phía và vừa đi vừa quan sát.',
    talk: [
      'Trên đường con đi học, chỗ nào là chỗ qua đường an toàn? Lần tới đi ngang, mình cùng chỉ cho nhau nhé.',
      'Nếu mình đang đi giữa đường mà đèn hình người xanh bắt đầu nhấp nháy thì sao? (Cứ đi tiếp sang bên kia, không quay lại, không chạy.)',
      'Ở Singapore và Việt Nam, xe chạy ở hai bên đường khác nhau. Vì vậy mình luôn nhìn cả hai phía. Con làm thử cho bố mẹ xem nhé.'
    ],
    scenarios: [
      {
        id: 'cross-hold-hand',
        tier: 1,
        scene: '🛣️🧑‍🧒🤝',
        pic: { bg: 'road', cast: [{ e: '🧒', you: true }, { e: '👨', size: 'l', say: { en: "Let's cross the road.", vi: 'Mình qua đường nhé.' } }] },
        q: {
          en: 'You and Daddy are about to cross the road. What do you do?',
          vi: 'Con và bố chuẩn bị qua đường. Con làm gì?'
        },
        choices: [
          {
            e: '🤝',
            en: "Hold Daddy's hand and cross together",
            vi: 'Nắm tay bố và cùng qua đường',
            v: 'best',
            why: {
              en: 'Holding hands keeps you right next to Daddy. Grown-ups are taller, so they can see the cars better.',
              vi: 'Nắm tay giúp con luôn ở sát bên bố. Người lớn cao hơn nên nhìn thấy xe rõ hơn.'
            }
          },
          {
            e: '🏃',
            en: 'Run ahead and wait on the other side',
            vi: 'Chạy trước rồi đứng chờ bố ở bên kia đường',
            v: 'no',
            why: {
              en: 'Cars can come quickly, and drivers may not see a small child running. Stay with Daddy all the way across.',
              vi: 'Xe có thể tới rất nhanh, và tài xế khó nhìn thấy một bạn nhỏ đang chạy. Con đi cùng bố suốt đoạn đường nhé.'
            }
          },
          {
            e: '🚶',
            en: 'Walk next to Daddy without holding hands',
            vi: 'Đi cạnh bố nhưng không nắm tay',
            v: 'ok',
            why: {
              en: 'Being close to Daddy helps. Holding hands is even safer, because Daddy can keep you right beside him.',
              vi: 'Đi gần bố cũng tốt. Nắm tay còn an toàn hơn, vì bố giữ được con ngay bên cạnh.'
            }
          }
        ],
        lesson: {
          en: "Crossing the road? Hold a grown-up's hand from one side all the way to the other.",
          vi: 'Qua đường thì nắm tay người lớn, từ bên này sang tận bên kia.'
        }
      },
      {
        id: 'cross-red-man',
        tier: 1,
        scene: '🚦🔴🧍',
        pic: { bg: 'road', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '🔴🤔' }] },
        q: {
          en: "The red man is showing, but you can't see any cars. Mummy is next to you. What should you do?",
          vi: 'Đèn đang hiện hình người màu đỏ, nhưng con không thấy chiếc xe nào. Mẹ đứng ngay cạnh con. Con nên làm gì?'
        },
        choices: [
          {
            e: '✋',
            en: 'Wait with Mummy for the green man',
            vi: 'Đứng chờ cùng mẹ đến khi đèn chuyển sang hình người xanh',
            v: 'best',
            why: {
              en: "A car can come round the corner very fast. The green man tells you when it's your turn.",
              vi: 'Xe có thể từ khúc cua chạy ra rất nhanh. Đèn hình người xanh sẽ báo khi nào tới lượt con đi.'
            }
          },
          {
            e: '🏃',
            en: 'Run across quickly while the road is empty',
            vi: 'Chạy thật nhanh qua đường khi đường đang vắng',
            v: 'no',
            why: {
              en: "A car can appear suddenly on an empty road. On the red man, drivers don't expect anyone to cross.",
              vi: 'Đường đang vắng nhưng xe có thể xuất hiện bất ngờ. Khi đèn hình người đỏ, tài xế không nghĩ là có người qua đường.'
            }
          },
          {
            e: '👣',
            en: 'Step onto the road a little to see better',
            vi: 'Bước xuống lòng đường một chút cho dễ nhìn',
            v: 'no',
            why: {
              en: 'The road is for cars. While you wait, stand on the pavement, a little back from the kerb.',
              vi: 'Lòng đường là chỗ xe chạy. Trong lúc chờ, con đứng trên vỉa hè, lùi vào một chút so với mép đường.'
            }
          }
        ],
        lesson: {
          en: 'Red man means wait, even when the road looks empty. Cross on the green man.',
          vi: 'Đèn hình người đỏ là phải chờ, kể cả khi đường vắng. Đèn hình người xanh mới được qua.'
        }
      },
      {
        id: 'cross-ball',
        tier: 1,
        scene: '⚽🛣️🚗',
        pic: { bg: 'road', cast: [{ e: '👩', size: 'l', x: 10 }, { e: '🧒', you: true, x: 30, think: '⚽' }, { e: '⚽', size: 's', x: 66, up: 25 }] },
        q: {
          en: 'You are playing ball in the park near the road. The ball bounces onto the road. What should you do?',
          vi: 'Con đang chơi bóng ở công viên gần đường. Quả bóng nảy ra lòng đường. Con nên làm gì?'
        },
        choices: [
          {
            e: '🛑',
            en: 'Stop at the kerb and ask a grown-up to get it',
            vi: 'Dừng lại ở mép đường và nhờ người lớn nhặt giúp',
            v: 'best',
            why: {
              en: "A grown-up can get it when it's safe. Balls can be replaced, but you are much more important!",
              vi: 'Người lớn sẽ nhặt bóng khi an toàn. Mất bóng thì mua quả khác, còn con thì quan trọng hơn nhiều!'
            }
          },
          {
            e: '⚽',
            en: 'Run after the ball before it rolls away',
            vi: 'Chạy theo quả bóng trước khi nó lăn mất',
            v: 'no',
            why: {
              en: 'When you chase a ball, you watch the ball, not the cars. A driver may not have time to stop.',
              vi: 'Khi đuổi theo bóng, con chỉ nhìn bóng mà không nhìn xe. Tài xế có thể không kịp dừng lại.'
            }
          },
          {
            e: '👀',
            en: 'Look both ways, then run out to get it yourself',
            vi: 'Nhìn hai phía rồi tự chạy ra nhặt',
            v: 'no',
            why: {
              en: "Looking is good, but children shouldn't go onto the road alone. Ask a grown-up to get it.",
              vi: 'Nhìn trước là tốt, nhưng trẻ em không nên tự xuống lòng đường. Con nhờ người lớn nhặt giúp nhé.'
            }
          }
        ],
        lesson: {
          en: 'Ball on the road? Stop at the kerb and ask a grown-up. Never chase it.',
          vi: 'Bóng lăn ra đường? Dừng ở mép đường và nhờ người lớn. Không bao giờ đuổi theo bóng.'
        }
      },
      {
        id: 'cross-zebra',
        tier: 2,
        scene: '🦓🚗👀',
        pic: { bg: 'road', cast: [{ e: '👩', size: 'l', x: 14 }, { e: '🧒', you: true, x: 32 }, { e: '🚙', size: 'l', flip: true, x: 82, up: 22 }] },
        q: {
          en: 'You and Mummy are at a zebra crossing. A car is coming towards it. What should you do?',
          vi: 'Con và mẹ đang đứng ở vạch kẻ đường cho người đi bộ. Có một chiếc ô tô đang chạy tới. Con nên làm gì?'
        },
        choices: [
          {
            e: '✋',
            en: 'Wait at the kerb until the car stops, then cross, still looking',
            vi: 'Chờ ở mép đường đến khi xe dừng hẳn, rồi vừa đi vừa quan sát',
            v: 'best',
            why: {
              en: 'Wait until the car has really stopped. Then look both ways, and keep looking as you cross.',
              vi: 'Chờ xe dừng hẳn rồi hãy đi. Nhớ nhìn cả hai phía, và vừa đi vừa quan sát.'
            }
          },
          {
            e: '🦓',
            en: 'Step onto the crossing, because cars must stop for you',
            vi: 'Bước luôn xuống vạch, vì xe phải dừng cho mình mà',
            v: 'no',
            why: {
              en: 'Drivers should stop, but some might not see you in time. Wait until the car has stopped before you step out.',
              vi: 'Tài xế phải dừng, nhưng có người không kịp nhìn thấy con. Chờ xe dừng hẳn rồi mới bước xuống nhé.'
            }
          },
          {
            e: '🏃',
            en: 'Run across before the car gets there',
            vi: 'Chạy thật nhanh qua trước khi xe tới',
            v: 'no',
            why: {
              en: 'Cars move faster than you think. Running in front of a car is never safe.',
              vi: 'Xe chạy nhanh hơn con nghĩ. Chạy ngang trước đầu xe không bao giờ an toàn.'
            }
          }
        ],
        lesson: {
          en: 'At any crossing: stop at the kerb, look both ways, wait for cars to stop, and keep looking as you cross.',
          vi: 'Ở mọi chỗ qua đường: dừng ở mép đường, nhìn cả hai phía, chờ xe dừng hẳn, và vừa đi vừa quan sát.'
        }
      },
      {
        id: 'cross-blinking',
        tier: 2,
        scene: '🚦🟢⏱️',
        pic: { bg: 'road', cast: [{ e: '👴', size: 'l' }, { e: '🧒', you: true, think: '🟢⏱️' }] },
        q: {
          en: 'You and Grandpa reach the crossing. The green man starts blinking and the numbers are counting down. What should you do?',
          vi: 'Con và ông vừa tới chỗ qua đường. Đèn hình người xanh bắt đầu nhấp nháy và đồng hồ đang đếm ngược. Con nên làm gì?'
        },
        choices: [
          {
            e: '⏳',
            en: 'Wait with Grandpa for the next green man',
            vi: 'Đứng chờ cùng ông tới lượt đèn xanh sau',
            v: 'best',
            why: {
              en: "Blinking means the light will change soon, so there isn't time to start. The next green man gives you lots of time.",
              vi: 'Đèn nhấp nháy là sắp đổi đèn, không đủ thời gian để bắt đầu đi. Lượt đèn xanh sau sẽ có nhiều thời gian hơn.'
            }
          },
          {
            e: '🏃',
            en: "Pull Grandpa's hand and run across",
            vi: 'Kéo tay ông chạy thật nhanh qua đường',
            v: 'no',
            why: {
              en: "Grandpa might trip, and the cars may start before you reach the other side. It's fine to wait a little.",
              vi: 'Ông có thể bị vấp ngã, và xe có thể chạy trước khi hai ông cháu sang tới nơi. Chờ một chút cũng không sao.'
            }
          },
          {
            e: '🚶',
            en: 'Start walking, because there are still some seconds left',
            vi: 'Cứ đi thôi, vì vẫn còn mấy giây nữa mà',
            v: 'no',
            why: {
              en: "The countdown is for people already crossing, so they can finish. When it blinks, don't start. Wait.",
              vi: 'Đồng hồ đếm ngược là để người đang đi kịp sang hết đường. Khi đèn nhấp nháy, mình không bắt đầu đi nữa mà đứng chờ.'
            }
          }
        ],
        lesson: {
          en: "Blinking green man? Don't start crossing. Wait for the next green man.",
          vi: 'Đèn hình người xanh nhấp nháy? Đừng bắt đầu qua đường. Chờ lượt đèn xanh sau.'
        }
      },
      {
        id: 'cross-overhead-bridge',
        tier: 2,
        scene: '🌉🚶🚗',
        pic: { bg: 'road', cast: [{ e: '👨', size: 'l', x: 14 }, { e: '🧒', you: true, x: 32, think: '🪜😩' }, { e: '🚌', size: 'l', flip: true, x: 70, up: 22 }] },
        q: {
          en: 'You and Daddy need to cross a big, busy road. There is an overhead bridge with lots of steps, and your legs are tired. What do you do?',
          vi: 'Con và bố cần qua một con đường lớn, nhiều xe. Ở đó có cầu vượt cho người đi bộ, nhưng nhiều bậc lắm, mà con đang mỏi chân. Con làm gì?'
        },
        choices: [
          {
            e: '🌉',
            en: 'Climb the bridge with Daddy, one step at a time',
            vi: 'Cùng bố leo lên cầu vượt, từng bậc một',
            v: 'best',
            why: {
              en: 'The bridge takes you over the cars, so it is the safest way. You can rest at the top.',
              vi: 'Cầu vượt đưa con đi phía trên dòng xe, nên đó là cách an toàn nhất. Lên tới nơi con nghỉ một chút cũng được.'
            }
          },
          {
            e: '🏃',
            en: 'Ask Daddy to run across the road below instead',
            vi: 'Xin bố chạy băng qua đường ở bên dưới cho nhanh',
            v: 'no',
            why: {
              en: 'Busy roads have fast cars and no green man there. Crossing like that is dangerous, even for grown-ups.',
              vi: 'Đường lớn có xe chạy nhanh, và ở đó không có đèn cho người đi bộ. Qua đường như vậy rất nguy hiểm, kể cả với người lớn.'
            }
          },
          {
            e: '😩',
            en: 'Sit down on the pavement and refuse to go',
            vi: 'Ngồi bệt xuống vỉa hè và không chịu đi',
            v: 'no',
            why: {
              en: "Tired legs are real! Tell Daddy you're tired. You can climb slowly together and rest at the top.",
              vi: 'Mỏi chân là thật mà! Con nói với bố là con mệt. Hai bố con leo từ từ rồi nghỉ ở trên cầu.'
            }
          }
        ],
        lesson: {
          en: 'Overhead bridges, zebra crossings and green man crossings are safe places to cross. Use them, even if it takes longer.',
          vi: 'Cầu vượt, vạch kẻ đường và chỗ có đèn hình người là những nơi qua đường an toàn. Hãy dùng chúng, dù có lâu hơn một chút.'
        }
      },
      {
        id: 'cross-parked-cars',
        tier: 3,
        scene: '🚗🧒🚙',
        pic: { bg: 'road', cast: [{ e: '👩', size: 'l', x: 10 }, { e: '🧒', you: true, x: 22 }, { e: '🚙', x: 31, up: 15 }, { e: '🧒', x: 88, up: 45, say: { en: 'Hello!', vi: 'Chào bạn!' } }] },
        q: {
          en: 'You and Mummy see {friend} on the other side of the road. Right in front of you, there is a gap between two parked cars. What should you do?',
          vi: 'Con và mẹ thấy {friend} ở bên kia đường. Ngay trước mặt có một khoảng trống giữa hai chiếc xe đang đỗ. Con nên làm gì?'
        },
        choices: [
          {
            e: '🚸',
            en: 'Walk with Mummy to the crossing, then go over to {friend}',
            vi: 'Cùng mẹ đi tới chỗ qua đường rồi mới sang với {friend}',
            v: 'best',
            why: {
              en: "At the crossing, you can see the cars and the drivers can see you. It's worth a few more steps.",
              vi: 'Ở chỗ qua đường, con nhìn thấy xe và tài xế cũng nhìn thấy con. Đi thêm vài bước cũng đáng mà.'
            }
          },
          {
            e: '👀',
            en: 'Peek out from between the cars, then cross with Mummy',
            vi: 'Ló ra nhìn từ giữa hai xe rồi cùng mẹ qua đường',
            v: 'no',
            why: {
              en: "Looking is good, but parked cars block your view. And drivers can't see a small child stepping out.",
              vi: 'Nhìn là tốt, nhưng xe đỗ che mất tầm nhìn của con. Tài xế cũng không thấy một bạn nhỏ bước ra.'
            }
          },
          {
            e: '📣',
            en: 'Call {friend} to come across to you',
            vi: 'Gọi {friend} chạy sang chỗ con',
            v: 'no',
            why: {
              en: '{friend} might rush out between the cars. Wave hello and meet at the crossing instead.',
              vi: '{friend} có thể vội chạy ra từ giữa các xe. Con vẫy tay chào rồi hai bạn gặp nhau ở chỗ qua đường nhé.'
            }
          }
        ],
        lesson: {
          en: 'Never cross between parked cars. Walk to a proper crossing, where drivers can see you.',
          vi: 'Không qua đường ở giữa các xe đang đỗ. Hãy đi tới chỗ qua đường, nơi tài xế nhìn thấy con.'
        }
      }
    ]
  },

  // ───────────────────────────── In the car ─────────────────────────────
  {
    id: 'life.in-the-car',
    world: 'road',
    icon: '🚗',
    title: 'In the car',
    vi: 'Khi đi ô tô',
    goal: 'Con luôn ngồi ghế ô tô của mình ở hàng ghế sau và thắt dây an toàn mỗi chuyến đi, lên xuống xe phía vỉa hè, và không bao giờ chơi trong hay quanh xe đang đỗ.',
    talk: [
      'Vì sao đi gần cũng phải thắt dây an toàn?',
      'Khi xuống xe, con nên ra cửa phía nào? Lần tới đi xe, mình cùng xem nhé.',
      'Nếu bố mẹ chỉ ghé vào cửa hàng một phút, con có nên ở lại trong xe một mình không? Vì sao?'
    ],
    scenarios: [
      {
        id: 'car-short-trip',
        tier: 1,
        scene: '🚗💺🔒',
        pic: { bg: 'car', cast: [{ e: '👨', size: 'l', say: { en: "Off to the market! It's near.", vi: 'Mình đi chợ nhé! Gần thôi.' } }, { e: '🧒', you: true }] },
        q: {
          en: "You get into the car to go to the market. It's a very short trip. What do you do?",
          vi: 'Con lên ô tô để đi chợ. Đường rất gần thôi. Con làm gì?'
        },
        choices: [
          {
            e: '🔒',
            en: 'Sit in your booster seat and buckle up',
            vi: 'Ngồi vào ghế ô tô của con và thắt dây an toàn',
            v: 'best',
            why: {
              en: 'Your seat belt keeps you safe on every trip, short or long. A car can stop suddenly anywhere.',
              vi: 'Dây an toàn giữ con an toàn trong mọi chuyến đi, gần hay xa. Ở đâu xe cũng có thể phanh gấp.'
            }
          },
          {
            e: '🙅',
            en: "Skip the seat belt, because it's so near",
            vi: 'Không cần thắt dây, vì đi gần mà',
            v: 'no',
            why: {
              en: 'A car can stop suddenly even on a short trip. Your seat belt holds you safely in your seat.',
              vi: 'Đi gần xe vẫn có thể phanh gấp. Dây an toàn giữ con ngồi yên trên ghế.'
            }
          },
          {
            e: '🪟',
            en: 'Kneel up on the seat to look out of the window',
            vi: 'Quỳ lên ghế để ngắm ra cửa sổ',
            v: 'no',
            why: {
              en: "Looking out is fun, but kneeling isn't safe if the car stops suddenly. Sit back, buckle up, and look from your seat.",
              vi: 'Ngắm cảnh thì vui, nhưng quỳ trên ghế không an toàn khi xe phanh gấp. Con ngồi ngay ngắn, thắt dây rồi ngắm từ ghế nhé.'
            }
          }
        ],
        lesson: {
          en: 'Every trip, every time: sit in your booster seat and buckle up before the car moves.',
          vi: 'Chuyến nào cũng vậy: ngồi vào ghế ô tô của con và thắt dây an toàn trước khi xe chạy.'
        }
      },
      {
        id: 'car-park-hold-hand',
        tier: 1,
        scene: '🅿️🚗🧒',
        pic: { bg: 'carpark', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '🛗' }, { e: '🚙', size: 'l', flip: true }] },
        q: {
          en: 'You get out of the car in a busy car park. The lift is on the other side. What do you do?',
          vi: 'Con xuống xe ở một bãi đỗ xe đông đúc. Thang máy ở tận phía bên kia. Con làm gì?'
        },
        choices: [
          {
            e: '🤝',
            en: "Hold your grown-up's hand and walk together",
            vi: 'Nắm tay người lớn và cùng đi bộ',
            v: 'best',
            why: {
              en: "In car parks, cars back out and turn a lot, and drivers can't easily see small children. Stay hand in hand.",
              vi: 'Trong bãi đỗ, xe lùi và rẽ liên tục, mà tài xế khó nhìn thấy trẻ nhỏ. Con nắm tay người lớn nhé.'
            }
          },
          {
            e: '🏃',
            en: 'Race to the lift to press the button first',
            vi: 'Chạy đua ra thang máy để được bấm nút trước',
            v: 'no',
            why: {
              en: 'A car backing out may not see you running past. Walk with your grown-up, and you can still press the button.',
              vi: 'Xe đang lùi có thể không thấy con chạy ngang qua. Con đi cùng người lớn, tới nơi vẫn được bấm nút mà.'
            }
          },
          {
            e: '🙈',
            en: 'Hide behind a parked car to surprise Mummy',
            vi: 'Trốn sau một chiếc xe đang đỗ để làm mẹ bất ngờ',
            v: 'no',
            why: {
              en: "A driver can't see a child behind a car, and the car might start moving. Car parks are never for playing.",
              vi: 'Tài xế không thể nhìn thấy trẻ ở phía sau xe, mà xe có thể chạy bất cứ lúc nào. Bãi đỗ xe không phải chỗ để chơi.'
            }
          }
        ],
        lesson: {
          en: "In a car park: hold a grown-up's hand, walk, and never play near or behind cars.",
          vi: 'Ở bãi đỗ xe: nắm tay người lớn, đi bộ, và không bao giờ chơi gần hay sau xe.'
        }
      },
      {
        id: 'car-dropped-toy',
        tier: 1,
        scene: '🚗🧸⬇️',
        pic: { bg: 'car', cast: [{ e: '👨', size: 'l' }, { e: '🧒', you: true, think: '🧸😟' }], props: ['🧸'] },
        q: {
          en: "The car is moving. Your toy falls onto the floor, and you can't reach it. What should you do?",
          vi: 'Xe đang chạy. Đồ chơi của con rơi xuống sàn xe, con với không tới. Con nên làm gì?'
        },
        choices: [
          {
            e: '⏳',
            en: 'Stay buckled and ask for it when the car stops',
            vi: 'Vẫn thắt dây, chờ xe dừng rồi nhờ lấy giúp',
            v: 'best',
            why: {
              en: 'The toy will still be there when the car stops. Your seat belt stays on the whole trip.',
              vi: 'Đồ chơi không mất đi đâu, xe dừng rồi lấy cũng được. Dây an toàn phải thắt suốt chuyến đi.'
            }
          },
          {
            e: '🔓',
            en: 'Unbuckle quickly to pick it up',
            vi: 'Tháo dây an toàn thật nhanh để nhặt',
            v: 'no',
            why: {
              en: "Even a few seconds without a belt isn't safe if the car stops suddenly. Keep it on until you arrive.",
              vi: 'Chỉ vài giây không thắt dây cũng không an toàn nếu xe phanh gấp. Con giữ dây đến khi tới nơi nhé.'
            }
          },
          {
            e: '😭',
            en: 'Shout until Daddy reaches back for it',
            vi: 'La lên cho đến khi bố với tay ra sau lấy',
            v: 'no',
            why: {
              en: 'Daddy needs his eyes and hands for driving, and shouting makes that harder. Ask calmly when the car stops.',
              vi: 'Bố cần mắt và tay để lái xe, la lên làm bố khó tập trung. Con bình tĩnh nhờ bố khi xe dừng nhé.'
            }
          }
        ],
        lesson: {
          en: 'Dropped something in the car? Keep your belt on and wait until the car stops.',
          vi: 'Làm rơi đồ trên xe? Cứ thắt dây an toàn và chờ xe dừng hẳn.'
        }
      },
      {
        id: 'car-pavement-side',
        tier: 2,
        scene: '🚗🚪🚶',
        pic: { bg: 'car', cast: [{ e: '👩', size: 'l', say: { en: "We're here!", vi: 'Tới nơi rồi!' } }, { e: '🧒', you: true, think: '🚪❓' }], props: ['🛵'] },
        q: {
          en: 'The car stops beside the road. Your door is on the road side, where cars pass by. How do you get out?',
          vi: 'Xe dừng bên đường. Cửa chỗ con ngồi lại ở phía lòng đường, nơi xe cộ chạy qua. Con xuống xe thế nào?'
        },
        choices: [
          {
            e: '↔️',
            en: 'Slide across and get out on the pavement side',
            vi: 'Nhích sang và xuống xe ở cửa phía vỉa hè',
            v: 'best',
            why: {
              en: "The pavement side is away from passing cars. Wait for your grown-up to say it's safe.",
              vi: 'Phía vỉa hè tránh xa dòng xe chạy. Con chờ người lớn bảo an toàn rồi mới xuống nhé.'
            }
          },
          {
            e: '🚪',
            en: 'Open your door quickly and jump out',
            vi: 'Mở cửa phía con thật nhanh rồi nhảy xuống',
            v: 'no',
            why: {
              en: 'A car or motorbike passing close by might not see your door opening. The pavement side is much safer.',
              vi: 'Ô tô, xe máy chạy sát bên cạnh có thể không kịp thấy cửa mở ra. Phía vỉa hè an toàn hơn nhiều.'
            }
          },
          {
            e: '🧍',
            en: 'Stay in your seat until a grown-up tells you what to do',
            vi: 'Ngồi yên trên ghế cho đến khi người lớn bảo',
            v: 'ok',
            why: {
              en: 'Waiting for a grown-up is smart. When they say go, slide across and get out on the pavement side.',
              vi: 'Chờ người lớn là khôn ngoan. Khi người lớn bảo xuống, con nhích sang và ra ở cửa phía vỉa hè.'
            }
          }
        ],
        lesson: {
          en: 'Get in and out of the car on the pavement side, away from the traffic.',
          vi: 'Lên xuống xe ở phía vỉa hè, tránh xa dòng xe chạy.'
        }
      },
      {
        id: 'car-play-inside',
        tier: 2,
        scene: '🚗☀️🧒',
        pic: { bg: 'carpark', cast: [{ e: '🧒', you: true }, { e: '🧒', say: { en: "Let's play inside the car!", vi: 'Mình vào xe chơi đi!' } }, { e: '🚗', size: 'l' }], props: ['🔓'] },
        q: {
          en: "You and {friend} are playing outside. Grandpa's car is parked and unlocked. {friend} says, 'Let's play inside the car!' What do you do?",
          vi: "Con và {friend} đang chơi ở ngoài. Xe của ông đang đỗ và chưa khoá cửa. {friend} rủ: 'Mình vào trong xe chơi đi!' Con làm gì?"
        },
        choices: [
          {
            e: '🙅',
            en: "Say 'No, cars aren't for playing' and tell a grown-up it's open",
            vi: "Nói 'Không, ô tô không phải chỗ chơi' và báo người lớn là xe chưa khoá",
            v: 'best',
            why: {
              en: 'A parked car gets very hot inside very fast, and the doors can be hard to open from inside. A grown-up can lock it.',
              vi: 'Xe đang đỗ nóng lên rất nhanh ở bên trong, và từ trong có khi rất khó mở cửa. Người lớn sẽ khoá xe lại.'
            }
          },
          {
            e: '🚗',
            en: 'Climb in and pretend to drive',
            vi: 'Leo vào ghế lái giả vờ lái xe',
            v: 'no',
            why: {
              en: "It looks fun, but a car gets hot inside very fast, and it's easy to get stuck. Cars are not play places.",
              vi: 'Trông thì vui, nhưng trong xe nóng lên rất nhanh và con có thể bị kẹt bên trong. Ô tô không phải là chỗ chơi.'
            }
          },
          {
            e: '🙈',
            en: 'Hide in the boot for hide-and-seek',
            vi: 'Trốn vào cốp xe khi chơi trốn tìm',
            v: 'no',
            why: {
              en: 'Nobody would know where you are, and a boot is hard to open from inside. Pick a safe hiding spot instead.',
              vi: 'Không ai biết con ở đó, và cốp xe rất khó mở từ bên trong. Con chọn chỗ trốn khác an toàn hơn nhé.'
            }
          }
        ],
        lesson: {
          en: 'Never play in or around parked cars, and never stay in a car alone, even for a minute.',
          vi: 'Không bao giờ chơi trong hay quanh xe đang đỗ, và không ở một mình trong xe, dù chỉ một phút.'
        }
      },
      {
        id: 'car-front-seat',
        tier: 3,
        scene: '🚗💺🤔',
        pic: { bg: 'car', cast: [{ e: '👨', size: 'l' }, { e: '🧒', you: true, say: { en: 'Can I sit in front?', vi: 'Con ngồi ghế trước nhé?' } }] },
        q: {
          en: 'You are going out in the car, and you would love to sit in the front next to Daddy. Where is the safest place for you?',
          vi: 'Cả nhà chuẩn bị đi ô tô, con rất muốn được ngồi ghế trước cạnh bố. Chỗ nào an toàn nhất cho con?'
        },
        choices: [
          {
            e: '💺',
            en: 'In the back seat, buckled into your booster seat',
            vi: 'Ở ghế sau, ngồi ghế ô tô của con và thắt dây',
            v: 'best',
            why: {
              en: "The back seat is the safest place for children. You'll sit in front when you're much bigger.",
              vi: 'Ghế sau là chỗ an toàn nhất cho trẻ em. Khi nào con lớn hơn nhiều thì mới ngồi ghế trước.'
            }
          },
          {
            e: '🤗',
            en: "On Mummy's lap in the back, with her arms around you",
            vi: 'Ngồi trong lòng mẹ ở ghế sau, mẹ ôm con thật chặt',
            v: 'no',
            why: {
              en: "Cuddles are lovely, but even strong arms can't hold you if the car stops suddenly. You need your own seat and belt.",
              vi: 'Được mẹ ôm thì thích thật, nhưng tay dù khoẻ cũng không giữ được con khi xe phanh gấp. Con cần ghế và dây an toàn riêng.'
            }
          },
          {
            e: '🪑',
            en: 'In the front seat, holding on tight',
            vi: 'Ở ghế trước, bám thật chặt',
            v: 'no',
            why: {
              en: "Front seats are made for grown-up-sized bodies. Holding on isn't enough if the car stops suddenly.",
              vi: 'Ghế trước được làm cho người lớn. Bám chặt không đủ giữ con an toàn khi xe phanh gấp.'
            }
          }
        ],
        lesson: {
          en: 'Children ride in the back seat, buckled into their own booster seat. No laps, no front seat.',
          vi: 'Trẻ em ngồi ghế sau, trên ghế ô tô của mình và thắt dây an toàn. Không ngồi lòng người lớn, không ngồi ghế trước.'
        }
      }
    ]
  },

  // ───────────────────────────── Bus and MRT ─────────────────────────────
  {
    id: 'life.bus-mrt',
    world: 'road',
    icon: '🚇',
    title: 'Bus and MRT',
    vi: 'Đi xe buýt và tàu điện',
    goal: 'Con biết đứng sau vạch vàng, nhường người xuống trước, bám tay vịn, bước qua khe hở, không vội lên khi cửa đang đóng, và biết làm gì nếu bị lạc nhau trên tàu.',
    talk: [
      'Khi tàu tới, mình đứng ở đâu để chờ người xuống trước?',
      'Nếu cửa tàu đóng lại mà con ở trong còn bố mẹ ở ngoài (hoặc ngược lại), nhà mình hẹn nhau thế nào?',
      'Trên xe buýt hay tàu mà hết ghế, con sẽ bám vào đâu?'
    ],
    scenarios: [
      {
        id: 'mrt-yellow-line',
        tier: 1,
        scene: '🚇🟨🧍',
        pic: { bg: 'mrt', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '🚇👀' }] },
        q: {
          en: 'You are waiting for the train with Mummy. You want to see it coming in. Where should you stand?',
          vi: 'Con và mẹ đang chờ tàu. Con muốn nhìn tàu chạy vào ga. Con nên đứng ở đâu?'
        },
        choices: [
          {
            e: '🟨',
            en: "Behind the yellow line, holding Mummy's hand",
            vi: 'Sau vạch vàng, nắm tay mẹ',
            v: 'best',
            why: {
              en: 'Behind the yellow line is the safe place to wait. You can still see the train arrive.',
              vi: 'Sau vạch vàng là chỗ chờ an toàn. Con vẫn nhìn thấy tàu vào ga mà.'
            }
          },
          {
            e: '👀',
            en: 'Right at the front, at the very edge, to see better',
            vi: 'Lên tận phía trước, sát mép sân ga cho dễ nhìn',
            v: 'no',
            why: {
              en: 'The edge is too close to the train as it comes in. Step back behind the yellow line.',
              vi: 'Mép sân ga quá gần đoàn tàu đang chạy vào. Con lùi lại sau vạch vàng nhé.'
            }
          },
          {
            e: '🤸',
            en: 'Walk along the yellow line like a balance beam',
            vi: 'Đi trên vạch vàng như đi thăng bằng',
            v: 'no',
            why: {
              en: 'It looks like a fun game, but the platform is for waiting safely. Save balancing for the playground!',
              vi: 'Trông như trò chơi vui, nhưng sân ga là chỗ chờ tàu an toàn. Để dành trò đi thăng bằng cho sân chơi nhé!'
            }
          }
        ],
        lesson: {
          en: 'On the platform, stand behind the yellow line until the train stops and the doors open.',
          vi: 'Trên sân ga, đứng sau vạch vàng cho đến khi tàu dừng hẳn và cửa mở.'
        }
      },
      {
        id: 'mrt-let-out-first',
        tier: 1,
        scene: '🚇🚪↔️',
        pic: { bg: 'mrt', cast: [{ e: '🧒', you: true, x: 14 }, { e: '🧑', size: 'l', x: 44 }, { e: '👩', size: 'l', x: 58 }, { e: '👴', size: 'l', x: 72 }] },
        value: 'respect',
        q: {
          en: 'The train doors open. Lots of people are getting off. What do you do?',
          vi: 'Cửa tàu mở. Rất nhiều người đang bước xuống. Con làm gì?'
        },
        choices: [
          {
            e: '↔️',
            en: 'Stand at the side of the door and let them out first',
            vi: 'Đứng sang một bên cửa, để mọi người xuống trước',
            v: 'best',
            why: {
              en: 'When people get off first, there is more room for you to get on, and nobody gets squashed.',
              vi: 'Mọi người xuống trước thì sẽ có chỗ cho con lên, và không ai bị chen lấn.'
            }
          },
          {
            e: '🏃',
            en: 'Squeeze in quickly to get a seat',
            vi: 'Lách vào thật nhanh để giành ghế',
            v: 'no',
            why: {
              en: 'Pushing in blocks the people getting off, and someone could get bumped. Wait a moment, then get on.',
              vi: 'Chen vào sẽ chặn đường người đang xuống, và có thể ai đó bị va vào. Con chờ một chút rồi mới lên.'
            }
          },
          {
            e: '🧍',
            en: 'Stand right in the middle of the doorway',
            vi: 'Đứng ngay giữa cửa tàu',
            v: 'no',
            why: {
              en: "People can't get out past you. Step to the side so they can, and then it's your turn.",
              vi: 'Mọi người không đi ra được. Con đứng sang một bên để họ ra, rồi sẽ tới lượt con.'
            }
          }
        ],
        lesson: {
          en: 'Let people get off first, then get on.',
          vi: 'Nhường người xuống trước, rồi mình mới lên.'
        }
      },
      {
        id: 'bus-hold-pole',
        tier: 1,
        scene: '🚌🧍🤲',
        pic: { bg: 'bus', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '😮' }, { e: '🧔', size: 'l' }] },
        q: {
          en: 'You get on the bus, but all the seats are taken. The bus starts to move. What should you do?',
          vi: 'Con lên xe buýt nhưng hết ghế rồi. Xe bắt đầu chạy. Con nên làm gì?'
        },
        choices: [
          {
            e: '🤲',
            en: 'Hold the pole or handrail, and stay close to your grown-up',
            vi: 'Bám vào cột hoặc tay vịn, và đứng sát người lớn',
            v: 'best',
            why: {
              en: 'Buses can jerk when they start, stop and turn. Holding on keeps you steady.',
              vi: 'Xe buýt có thể giật khi chạy, khi dừng và khi rẽ. Bám tay vịn giúp con đứng vững.'
            }
          },
          {
            e: '🏄',
            en: 'Try to stand without holding on, like surfing',
            vi: 'Thử đứng không bám, như đang lướt sóng',
            v: 'no',
            why: {
              en: 'It feels like a fun game, but a sudden stop can make you fall. Hold on with your hand.',
              vi: 'Nghe như trò chơi vui, nhưng xe dừng đột ngột là con dễ ngã. Con bám tay vịn nhé.'
            }
          },
          {
            e: '⬇️',
            en: 'Sit on the floor by the door',
            vi: 'Ngồi bệt xuống sàn cạnh cửa xe',
            v: 'no',
            why: {
              en: 'People need the doorway to get on and off, and they might trip over you. Hold the pole instead.',
              vi: 'Lối cửa là chỗ mọi người lên xuống, họ có thể vấp vào con. Con đứng bám cột nhé.'
            }
          }
        ],
        lesson: {
          en: 'On a moving bus or train, sit down or hold on.',
          vi: 'Khi xe buýt hay tàu đang chạy, hãy ngồi hoặc bám tay vịn.'
        }
      },
      {
        id: 'mrt-mind-gap',
        tier: 2,
        scene: '🚇⬛👟',
        pic: { bg: 'mrt', cast: [{ e: '👨', size: 'l', x: 44 }, { e: '🧒', you: true, x: 58, think: '👟' }] },
        q: {
          en: 'You are getting off the train. There is a gap between the train and the platform. What do you do?',
          vi: 'Con chuẩn bị xuống tàu. Giữa tàu và sân ga có một khe hở. Con làm gì?'
        },
        choices: [
          {
            e: '👟',
            en: "Hold your grown-up's hand and take a big step over the gap",
            vi: 'Nắm tay người lớn và bước một bước dài qua khe hở',
            v: 'best',
            why: {
              en: 'A big, careful step gets you over the gap. Holding hands helps if you wobble.',
              vi: 'Một bước dài, cẩn thận là qua được khe hở. Nắm tay giúp con không bị loạng choạng.'
            }
          },
          {
            e: '🦘',
            en: 'Jump over it with both feet',
            vi: 'Nhảy chụm hai chân qua khe',
            v: 'no',
            why: {
              en: 'Jumping can make you slip or land on someone. A careful big step is safer.',
              vi: 'Nhảy dễ bị trượt chân hoặc đáp trúng người khác. Một bước dài cẩn thận an toàn hơn.'
            }
          },
          {
            e: '🧸',
            en: 'Walk out while looking at your toy',
            vi: 'Vừa bước ra vừa mải nhìn đồ chơi',
            v: 'no',
            why: {
              en: 'If you are looking at a toy, your foot might slip into the gap. Look down and watch your step.',
              vi: 'Nếu mải nhìn đồ chơi, chân con có thể lọt vào khe. Con nhìn xuống chân nhé.'
            }
          }
        ],
        lesson: {
          en: 'Mind the gap! Look down, hold hands, and take a big step.',
          vi: 'Cẩn thận khe hở! Nhìn xuống chân, nắm tay người lớn và bước một bước dài.'
        }
      },
      {
        id: 'mrt-doors-closing',
        tier: 2,
        scene: '🚇🔔🚪',
        pic: { bg: 'mrt', cast: [{ e: '👩', size: 'l', x: 18 }, { e: '🧒', you: true, x: 34, think: '🏃❓' }], props: ['🔔'] },
        q: {
          en: 'You hear the door-closing chime, and the lights by the doors are blinking. Your train is right there. What should you do?',
          vi: 'Con nghe tiếng chuông báo đóng cửa, đèn trên cửa tàu đang nhấp nháy. Tàu ở ngay trước mặt. Con nên làm gì?'
        },
        choices: [
          {
            e: '⏳',
            en: 'Stay back and wait for the next train',
            vi: 'Đứng lại và chờ chuyến tàu sau',
            v: 'best',
            why: {
              en: 'The doors are about to close. Another train will come in a few minutes.',
              vi: 'Cửa sắp đóng rồi. Vài phút nữa sẽ có chuyến tàu khác.'
            }
          },
          {
            e: '🏃',
            en: 'Run and jump in before the doors close',
            vi: 'Chạy thật nhanh nhảy vào trước khi cửa đóng',
            v: 'no',
            why: {
              en: 'You could get caught in the doors, or end up on the train without your grown-up.',
              vi: 'Con có thể bị kẹp cửa, hoặc lên được tàu mà người lớn thì ở lại bên ngoài.'
            }
          },
          {
            e: '✋',
            en: 'Put your hand or bag in the doors to stop them',
            vi: 'Đưa tay hoặc túi vào khe cửa để giữ cửa lại',
            v: 'no',
            why: {
              en: 'Train doors are strong and can pinch, and it delays everyone. The next train is coming soon.',
              vi: 'Cửa tàu rất mạnh và có thể kẹp đau, lại làm cả đoàn tàu bị chậm. Chuyến sau sẽ tới ngay thôi.'
            }
          }
        ],
        lesson: {
          en: "Doors closing? Don't rush. Step back and wait for the next train.",
          vi: 'Cửa đang đóng? Đừng vội. Lùi lại và chờ chuyến sau.'
        }
      },
      {
        id: 'bus-stop-wait',
        tier: 2,
        scene: '🚏🚌🧍',
        pic: { bg: 'busstop', cast: [{ e: '👵', size: 'l', x: 22 }, { e: '🧒', you: true, x: 40, think: '🚌' }] },
        q: {
          en: 'You and Grandma are at the bus stop. Your bus is coming! What do you do?',
          vi: 'Con và bà đang ở trạm xe buýt. Xe buýt của hai bà cháu đang tới! Con làm gì?'
        },
        choices: [
          {
            e: '🧍',
            en: 'Stand back from the kerb until the bus stops and the doors open',
            vi: 'Đứng lùi khỏi mép đường đến khi xe dừng hẳn và mở cửa',
            v: 'best',
            why: {
              en: 'A big bus pulls in very close to the kerb. Standing back keeps you safe until it stops.',
              vi: 'Xe buýt to sẽ tấp sát vào lề. Đứng lùi vào trong giúp con an toàn cho đến khi xe dừng hẳn.'
            }
          },
          {
            e: '🏃',
            en: 'Run to the edge of the kerb so the driver sees you',
            vi: 'Chạy ra sát mép đường để tài xế thấy con',
            v: 'no',
            why: {
              en: 'The bus comes very close to the kerb. Grandma can wave to the driver while you stand back.',
              vi: 'Xe buýt chạy rất sát lề đường. Bà sẽ vẫy xe, còn con đứng lùi vào trong nhé.'
            }
          },
          {
            e: '🚌',
            en: 'Walk towards the bus while it is still moving',
            vi: 'Đi về phía xe buýt khi xe vẫn đang chạy',
            v: 'no',
            why: {
              en: 'Wait until the bus has stopped completely. Then walk to the door with Grandma.',
              vi: 'Con chờ xe dừng hẳn, rồi mới cùng bà đi tới cửa xe.'
            }
          }
        ],
        lesson: {
          en: 'At the bus stop, stand back from the kerb until the bus has stopped.',
          vi: 'Ở trạm xe buýt, đứng lùi khỏi mép đường cho đến khi xe dừng hẳn.'
        }
      },
      {
        id: 'mrt-separated',
        tier: 3,
        region: 'SG',
        scene: '🚇🚪😮',
        pic: { bg: 'mrt', cast: [{ e: '👩', size: 'l', x: 18, say: { en: 'Oh no, the doors!', vi: 'Ôi, cửa đóng rồi!' } }, { e: '🧒', you: true, x: 50, up: 36 }] },
        q: {
          en: 'You step onto the MRT, and the doors close before Mummy can get on. The train starts moving. What should you do?',
          vi: 'Con vừa bước lên tàu MRT thì cửa đóng lại, mẹ chưa kịp lên. Tàu bắt đầu chạy. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Get off at the next station and tell the station staff',
            vi: 'Xuống ở ga kế tiếp và báo cho nhân viên nhà ga',
            v: 'best',
            why: {
              en: 'Station staff know how to help children find their family. Stay inside the station with them.',
              vi: 'Nhân viên nhà ga biết cách giúp trẻ em tìm lại gia đình. Con ở yên trong nhà ga cùng họ nhé.'
            }
          },
          {
            e: '🚇',
            en: 'Stay on the train all the way to the last stop',
            vi: 'Cứ ngồi trên tàu đến tận ga cuối',
            v: 'no',
            why: {
              en: 'The train takes you further and further away. Get off at the very next station so Mummy can find you.',
              vi: 'Tàu sẽ đưa con đi xa dần. Con xuống ngay ga kế tiếp để mẹ dễ tìm con.'
            }
          },
          {
            e: '🚶',
            en: 'Get off and leave the station to look for Mummy',
            vi: 'Xuống tàu rồi ra khỏi nhà ga để đi tìm mẹ',
            v: 'no',
            why: {
              en: 'Outside the station, it is very hard for Mummy to find you. Stay inside and tell the station staff.',
              vi: 'Ra khỏi nhà ga thì mẹ rất khó tìm con. Con ở trong nhà ga và báo cho nhân viên nhà ga nhé.'
            }
          }
        ],
        lesson: {
          en: 'Separated on the MRT? Get off at the next station, stay inside the station, and tell the station staff.',
          vi: 'Lạc nhau trên tàu MRT? Xuống ở ga kế tiếp, ở yên trong nhà ga và báo cho nhân viên nhà ga.'
        }
      }
    ]
  },

  // ───────────────────────────── Escalators and lifts ─────────────────────────────
  {
    id: 'life.escalator-lift',
    world: 'road',
    icon: '🛗',
    title: 'Escalators and lifts',
    vi: 'Thang cuốn và thang máy',
    goal: 'Con biết đứng yên, nhìn về phía trước, bám tay vịn và giữ chân trong vạch vàng trên thang cuốn; giữ tay và đồ chơi tránh xa cửa thang máy; và bình tĩnh bấm chuông khi thang máy bị kẹt.',
    talk: [
      'Trước khi bước lên thang cuốn, con kiểm tra những gì? (dây giày, quần áo dài, tay đã cầm tay vịn chưa)',
      'Nút chuông báo động trong thang máy nhà mình ở đâu? Lần tới đi thang máy, mình cùng tìm nhé.',
      'Vì sao không được chạy, ngồi hay chơi đùa trên thang cuốn?'
    ],
    scenarios: [
      {
        id: 'esc-stand-still',
        tier: 1,
        scene: '🏬⬆️🧍',
        pic: { bg: 'escalator', cast: [{ e: '👩', size: 'l', x: 22, up: 2 }, { e: '🧒', you: true, x: 46, up: 28 }] },
        q: {
          en: 'You step onto the escalator at the mall. What should you do?',
          vi: 'Con bước lên thang cuốn ở trung tâm thương mại. Con nên làm gì?'
        },
        choices: [
          {
            e: '🧍',
            en: 'Stand still, face forward and hold the handrail',
            vi: 'Đứng yên, nhìn về phía trước và bám tay vịn',
            v: 'best',
            why: {
              en: 'Standing still and holding on keeps you steady while the steps move.',
              vi: 'Đứng yên và bám tay vịn giúp con đứng vững khi bậc thang chuyển động.'
            }
          },
          {
            e: '🏃',
            en: 'Run up the moving steps for fun',
            vi: 'Chạy lên các bậc thang đang chuyển động cho vui',
            v: 'no',
            why: {
              en: 'The steps are moving and have hard edges. Running can make you trip and fall.',
              vi: 'Bậc thang đang chuyển động và có cạnh cứng. Chạy dễ làm con vấp ngã.'
            }
          },
          {
            e: '🪑',
            en: 'Sit down on a step for a rest',
            vi: 'Ngồi xuống bậc thang nghỉ một chút',
            v: 'no',
            why: {
              en: 'Sitting puts your hands and clothes close to the moving edges, where they could get caught. Rest when you get off.',
              vi: 'Khi ngồi, tay và quần áo của con ở sát các mép đang chuyển động, dễ bị kẹt. Xuống thang rồi hãy nghỉ.'
            }
          }
        ],
        lesson: {
          en: 'On the escalator: stand still, face forward and hold the handrail. No running or sitting.',
          vi: 'Trên thang cuốn: đứng yên, nhìn về phía trước và bám tay vịn. Không chạy, không ngồi.'
        }
      },
      {
        id: 'lift-doors-closing',
        tier: 1,
        scene: '🛗🚪✋',
        pic: { bg: 'lift', cast: [{ e: '👵', size: 'l', x: 14 }, { e: '🧒', you: true, x: 28, think: '🏃❓' }] },
        q: {
          en: 'You and Grandma are walking to the lift. The doors are starting to close. What should you do?',
          vi: 'Con và bà đang đi tới thang máy. Cửa thang bắt đầu đóng lại. Con nên làm gì?'
        },
        choices: [
          {
            e: '⏳',
            en: 'Wait with Grandma for the lift to come again',
            vi: 'Đứng chờ cùng bà cho thang máy quay lại',
            v: 'best',
            why: {
              en: 'Press the button and the lift will come back. Waiting a little is safe and easy.',
              vi: 'Bấm nút gọi là thang máy sẽ quay lại. Chờ một chút vừa an toàn vừa dễ.'
            }
          },
          {
            e: '✋',
            en: 'Put your hand in the gap to stop the doors',
            vi: 'Thò tay vào khe cửa để chặn cửa lại',
            v: 'no',
            why: {
              en: 'Lift doors can pinch fingers. Never put your hands, feet or toys in the doors.',
              vi: 'Cửa thang máy có thể kẹp tay. Đừng bao giờ thò tay, chân hay đồ chơi vào cửa thang.'
            }
          },
          {
            e: '🏃',
            en: 'Dash inside before the doors shut',
            vi: 'Lao vào trong trước khi cửa đóng',
            v: 'no',
            why: {
              en: 'The doors might close on you, or you could go up without Grandma.',
              vi: 'Cửa có thể đóng vào người con, hoặc con đi lên một mình mà bà ở lại.'
            }
          }
        ],
        lesson: {
          en: 'Never stop lift doors with your hands or toys. Wait for the lift to come again.',
          vi: 'Không dùng tay hay đồ chơi để chặn cửa thang máy. Hãy chờ thang quay lại.'
        }
      },
      {
        id: 'esc-yellow-lines',
        tier: 2,
        scene: '⬆️🟨👟',
        pic: { bg: 'escalator', cast: [{ e: '🧒', you: true, x: 45, up: 28, think: '👟' }] },
        q: {
          en: 'On the escalator, your shoe is touching the side, right next to the yellow line. What should you do?',
          vi: 'Trên thang cuốn, giày của con đang chạm vào thành bên, sát vạch vàng. Con nên làm gì?'
        },
        choices: [
          {
            e: '👟',
            en: 'Move your feet into the middle, inside the yellow lines',
            vi: 'Đưa chân vào giữa bậc, bên trong vạch vàng',
            v: 'best',
            why: {
              en: 'The sides can catch shoes, especially soft ones. Keeping your feet in the middle is safest.',
              vi: 'Thành bên có thể kẹp giày, nhất là giày mềm. Để chân ở giữa bậc là an toàn nhất.'
            }
          },
          {
            e: '🎵',
            en: 'Rub your shoe along the side, because it makes a funny noise',
            vi: 'Cọ giày vào thành thang, vì nghe kêu vui tai',
            v: 'no',
            why: {
              en: 'It might sound funny, but your shoe could get caught in the gap at the side.',
              vi: 'Nghe vui tai thật, nhưng giày con có thể bị kẹt vào khe ở thành bên.'
            }
          },
          {
            e: '🦶',
            en: 'Stand right on top of the yellow line',
            vi: 'Đứng ngay trên vạch vàng',
            v: 'no',
            why: {
              en: 'The yellow lines show where the edge is. Your feet belong inside the lines, in the middle of the step.',
              vi: 'Vạch vàng để báo đâu là mép bậc. Chân con phải đặt bên trong vạch, ở giữa bậc thang.'
            }
          }
        ],
        lesson: {
          en: 'Keep both feet in the middle of the step, inside the yellow lines.',
          vi: 'Đặt cả hai chân ở giữa bậc thang, bên trong vạch vàng.'
        }
      },
      {
        id: 'esc-shoelace',
        tier: 2,
        scene: '👟🪢⬆️',
        pic: { bg: 'escalator', cast: [{ e: '👨', size: 'l', x: 8 }, { e: '🧒', you: true, x: 20, think: '👟❓' }] },
        q: {
          en: 'You are about to get on the escalator. You notice your shoelace is untied. What should you do?',
          vi: 'Con sắp bước lên thang cuốn thì thấy dây giày bị tuột. Con nên làm gì?'
        },
        choices: [
          {
            e: '🪢',
            en: 'Step aside and ask a grown-up to help you tie it first',
            vi: 'Đứng sang một bên, nhờ người lớn buộc lại trước đã',
            v: 'best',
            why: {
              en: 'Loose laces can get caught in the moving steps. Tie them before you get on.',
              vi: 'Dây giày lỏng có thể bị cuốn vào bậc thang. Buộc lại rồi mới lên nhé.'
            }
          },
          {
            e: '⬆️',
            en: 'Get on and tie it on the escalator',
            vi: 'Cứ lên thang rồi buộc trên đó',
            v: 'no',
            why: {
              en: 'Bending down on moving steps is wobbly, and the lace could still get caught. Tie it before you get on.',
              vi: 'Cúi xuống trên thang đang chạy dễ mất thăng bằng, và dây vẫn có thể bị cuốn vào. Buộc trước khi lên nhé.'
            }
          },
          {
            e: '🤷',
            en: "It's fine, just step carefully",
            vi: 'Không sao đâu, chỉ cần bước cẩn thận',
            v: 'no',
            why: {
              en: 'Careful steps are good, but a loose lace can still get pulled into the step. Tie it first.',
              vi: 'Bước cẩn thận là tốt, nhưng dây giày lỏng vẫn có thể bị cuốn vào bậc thang. Con buộc lại trước đã.'
            }
          }
        ],
        lesson: {
          en: 'Before the escalator, tie loose laces and keep long clothes away from the steps.',
          vi: 'Trước khi lên thang cuốn, buộc lại dây giày lỏng và giữ quần áo dài tránh xa bậc thang.'
        }
      },
      {
        id: 'lift-stuck',
        tier: 2,
        scene: '🛗⏸️🔔',
        pic: { bg: 'lift', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '😟' }], props: ['🔔'] },
        q: {
          en: "You and Mummy are in the lift. It stops between floors, and the doors don't open. What should you do?",
          vi: 'Con và mẹ đang ở trong thang máy. Thang dừng giữa hai tầng và cửa không mở. Con nên làm gì?'
        },
        choices: [
          {
            e: '🔔',
            en: 'Press the alarm bell with Mummy and wait calmly for help',
            vi: 'Cùng mẹ bấm chuông báo động và bình tĩnh chờ người tới giúp',
            v: 'best',
            why: {
              en: 'The alarm bell tells people you need help, and help will come. The lift is a safe place to wait.',
              vi: 'Chuông báo động cho mọi người biết mình cần giúp, và sẽ có người tới. Ở yên trong thang chờ là an toàn.'
            }
          },
          {
            e: '🚪',
            en: 'Try to pull the doors open with your hands',
            vi: 'Cố lấy tay cạy cửa ra',
            v: 'no',
            why: {
              en: 'Forcing the doors is not safe when the lift is between floors. Wait for the helpers to open them properly.',
              vi: 'Cạy cửa khi thang đang ở giữa hai tầng là không an toàn. Hãy chờ người tới giúp mở cửa đúng cách.'
            }
          },
          {
            e: '🦘',
            en: 'Jump up and down to make it move again',
            vi: 'Nhảy lên nhảy xuống cho thang chạy lại',
            v: 'no',
            why: {
              en: "Jumping won't fix the lift. Stay still and calm while you wait for help.",
              vi: 'Nhảy không làm thang chạy lại được. Con đứng yên, bình tĩnh chờ người tới giúp.'
            }
          }
        ],
        lesson: {
          en: "Stuck in a lift? Press the alarm bell, stay calm and wait for help. Don't force the doors.",
          vi: 'Bị kẹt thang máy? Bấm chuông báo động, giữ bình tĩnh và chờ người tới giúp. Không cạy cửa.'
        }
      },
      {
        id: 'esc-step-off',
        tier: 3,
        scene: '⬆️🚶🤔',
        pic: { bg: 'escalator', cast: [{ e: '🧑', x: 44, up: 27 }, { e: '👩', x: 52, up: 38 }, { e: '🧒', you: true, x: 62, up: 46 }] },
        q: {
          en: "You reach the top of the escalator. You're not sure which way to go next. What should you do?",
          vi: 'Con lên tới đầu thang cuốn. Con chưa biết nên đi hướng nào. Con nên làm gì?'
        },
        choices: [
          {
            e: '🚶',
            en: 'Step off, walk a few steps away, then decide with your grown-up',
            vi: 'Bước ra, đi xa đầu thang vài bước, rồi cùng người lớn chọn đường',
            v: 'best',
            why: {
              en: 'People behind you keep arriving. Moving away from the end makes room, so nobody bumps into you.',
              vi: 'Người phía sau vẫn đang lên tới. Đi ra xa đầu thang một chút để không ai va vào con.'
            }
          },
          {
            e: '🧍',
            en: 'Stop right at the end to look around',
            vi: 'Dừng ngay ở đầu thang để nhìn quanh',
            v: 'no',
            why: {
              en: 'The escalator keeps bringing people up. If you stop there, they could bump into you. Walk clear first.',
              vi: 'Thang cuốn vẫn đưa người lên liên tục. Con đứng lại ở đó thì họ có thể va vào con. Đi ra chỗ thoáng trước đã.'
            }
          },
          {
            e: '🔁',
            en: 'Walk back down the up escalator to start again',
            vi: 'Đi ngược xuống trên chiếc thang đang chạy lên',
            v: 'no',
            why: {
              en: 'Going the wrong way can make you fall and bump into people. Use the escalator that goes down.',
              vi: 'Đi ngược chiều dễ ngã và va vào người khác. Con đi chiếc thang chạy xuống nhé.'
            }
          }
        ],
        lesson: {
          en: 'At the end of the escalator, step off and keep moving so the way stays clear.',
          vi: 'Tới cuối thang cuốn, bước ra và đi tiếp để không chắn lối.'
        }
      }
    ]
  },

  // ───────────────────────────── Bikes, scooters & play ─────────────────────────────
  {
    id: 'life.ride-play',
    world: 'road',
    icon: '🚲',
    title: 'Bikes, scooters & play',
    vi: 'Xe đạp, xe scooter và sân chơi',
    goal: 'Con luôn đội mũ bảo hiểm và cài quai khi đi xe đạp, xe scooter hay ngồi xe máy, chỉ chạy xe ở nơi an toàn xa xe cộ, và chơi cầu trượt, xích đu đúng cách.',
    talk: [
      'Mình cùng kiểm tra mũ bảo hiểm của con nhé: mũ có vừa đầu không, quai đã cài chặt chưa?',
      'Quanh nhà mình, chỗ nào an toàn để con đi xe đạp hoặc xe scooter?',
      'Ở sân chơi, vì sao không nên đi ngang trước hay sau xích đu đang đung đưa?'
    ],
    scenarios: [
      {
        id: 'ride-helmet',
        tier: 1,
        scene: '🚲⛑️🧒',
        pic: { bg: 'park', cast: [{ e: '🧒', you: true, think: '🏠⛑️' }, { e: '🚲', size: 'l' }] },
        q: {
          en: 'You want to ride your bike at the park. Your helmet is still at home on the shelf. What do you do?',
          vi: 'Con muốn đi xe đạp ở công viên. Mũ bảo hiểm của con vẫn để trên kệ ở nhà. Con làm gì?'
        },
        choices: [
          {
            e: '⛑️',
            en: 'Go back for your helmet and buckle the strap',
            vi: 'Quay lại lấy mũ bảo hiểm và cài quai cẩn thận',
            v: 'best',
            why: {
              en: 'A helmet protects your head if you fall. Wear it on every ride, with the strap buckled.',
              vi: 'Mũ bảo hiểm bảo vệ đầu con khi bị ngã. Lần nào đi xe cũng đội và cài quai nhé.'
            }
          },
          {
            e: '🚲',
            en: "Ride without it, because you're only going slowly",
            vi: 'Cứ đi không cần mũ, vì con chỉ đi chậm thôi',
            v: 'no',
            why: {
              en: "Falls can happen even when you ride slowly. Your helmet is like a seat belt for your head!",
              vi: 'Đi chậm vẫn có thể bị ngã. Mũ bảo hiểm giống như dây an toàn cho cái đầu của con!'
            }
          },
          {
            e: '🧢',
            en: 'Wear your cap instead',
            vi: 'Đội mũ lưỡi trai thay vào',
            v: 'no',
            why: {
              en: "A cap keeps the sun off, but it can't protect your head in a fall. You need your helmet.",
              vi: 'Mũ lưỡi trai che nắng được, nhưng không bảo vệ đầu khi ngã. Con cần mũ bảo hiểm.'
            }
          }
        ],
        lesson: {
          en: 'Bike or scooter? Helmet on and strap buckled, every single ride.',
          vi: 'Đi xe đạp hay xe scooter? Đội mũ bảo hiểm và cài quai, lần nào cũng vậy.'
        }
      },
      {
        id: 'playground-slide-feet',
        tier: 1,
        scene: '🛝🧒⬇️',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, x: 70, up: 34, think: '🤔' }] },
        q: {
          en: "It's your turn on the slide. How should you go down?",
          vi: 'Tới lượt con chơi cầu trượt. Con nên trượt xuống thế nào?'
        },
        choices: [
          {
            e: '🦶',
            en: 'Sit down and go feet first',
            vi: 'Ngồi xuống và trượt chân xuống trước',
            v: 'best',
            why: {
              en: "Feet first means you can see where you're going and land on your feet.",
              vi: 'Trượt chân xuống trước giúp con nhìn thấy phía trước và tiếp đất bằng chân.'
            }
          },
          {
            e: '🐧',
            en: 'Lie on your tummy and go head first',
            vi: 'Nằm sấp và trượt đầu xuống trước',
            v: 'no',
            why: {
              en: 'Head first, your head reaches the bottom first and could bump the ground or another child. Feet first is safer.',
              vi: 'Trượt đầu xuống trước thì đầu chạm đất trước, dễ va vào đất hoặc vào bạn khác. Chân xuống trước an toàn hơn.'
            }
          },
          {
            e: '🧗',
            en: 'Climb up the slide from the bottom',
            vi: 'Leo ngược lên từ dưới chân cầu trượt',
            v: 'no',
            why: {
              en: 'Someone could slide down into you. Use the ladder or steps to go up.',
              vi: 'Có thể có bạn đang trượt xuống va vào con. Con leo lên bằng thang nhé.'
            }
          }
        ],
        lesson: {
          en: 'On the slide: climb up the ladder, sit down, and go feet first.',
          vi: 'Chơi cầu trượt: leo lên bằng thang, ngồi xuống và trượt chân xuống trước.'
        }
      },
      {
        id: 'playground-slide-wait',
        tier: 1,
        scene: '🛝⏳🧒',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, x: 70, up: 34 }, { e: '🧒', x: 90 }] },
        value: 'respect',
        q: {
          en: "You're at the top of the slide. {friend} has just reached the bottom and is still sitting there. What do you do?",
          vi: 'Con đang ở trên đỉnh cầu trượt. {friend} vừa trượt xuống tới dưới và vẫn đang ngồi ở đó. Con làm gì?'
        },
        choices: [
          {
            e: '⏳',
            en: 'Wait until {friend} has moved away, then slide',
            vi: 'Chờ {friend} đi ra chỗ khác rồi mới trượt',
            v: 'best',
            why: {
              en: "Waiting means you won't crash into {friend}. Taking turns keeps everyone safe and happy.",
              vi: 'Chờ một chút để con không đâm vào {friend}. Lần lượt từng bạn thì ai cũng an toàn và vui.'
            }
          },
          {
            e: '🛝',
            en: '{friend} will move, so slide down anyway',
            vi: 'Cứ trượt xuống, {friend} sẽ tự tránh',
            v: 'no',
            why: {
              en: '{friend} might not see you coming, and you could both get hurt.',
              vi: '{friend} có thể không thấy con trượt xuống, và cả hai bạn có thể bị đau.'
            }
          },
          {
            e: '📣',
            en: "Shout 'Move!' and slide down at the same time",
            vi: "Hét 'Tránh ra!' rồi trượt xuống luôn",
            v: 'no',
            why: {
              en: '{friend} may not have time to move. Call out kindly, then wait until the bottom is clear.',
              vi: '{friend} có thể không kịp tránh. Con gọi bạn nhẹ nhàng rồi chờ đến khi phía dưới trống nhé.'
            }
          }
        ],
        lesson: {
          en: 'Take turns on the slide. Wait until the bottom is clear before you go.',
          vi: 'Chơi cầu trượt lần lượt. Chờ phía dưới trống rồi mới trượt.'
        }
      },
      {
        id: 'ride-where',
        tier: 2,
        scene: '🛴🌳🛣️',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🛴❓' }], props: ['🛴', '🎁'] },
        q: {
          en: 'You have a new scooter! Where is a safe place to ride it?',
          vi: 'Con có chiếc xe scooter mới! Chỗ nào an toàn để con chạy xe?'
        },
        choices: [
          {
            e: '🌳',
            en: 'In the park or on a path, with a grown-up watching',
            vi: 'Ở công viên hoặc lối đi bộ, có người lớn trông',
            v: 'best',
            why: {
              en: 'Parks and paths away from cars are the best places, and your grown-up can help if you fall.',
              vi: 'Công viên và lối đi xa xe cộ là chỗ tốt nhất, và người lớn có thể giúp nếu con bị ngã.'
            }
          },
          {
            e: '🛣️',
            en: "On the road, because it's nice and smooth",
            vi: 'Dưới lòng đường, vì đường phẳng và êm',
            v: 'no',
            why: {
              en: 'Roads are for cars, buses and motorbikes, and drivers may not see a small rider. Stay off the road.',
              vi: 'Lòng đường là chỗ của ô tô, xe buýt và xe máy, tài xế khó nhìn thấy một bạn nhỏ. Con đừng xuống lòng đường nhé.'
            }
          },
          {
            e: '🅿️',
            en: "In the car park, because there's lots of space",
            vi: 'Trong bãi đỗ xe, vì ở đó rộng',
            v: 'no',
            why: {
              en: "Cars backing out of their spaces can't see you. Find a park or a path instead.",
              vi: 'Xe lùi ra khỏi chỗ đỗ không nhìn thấy con. Con tìm công viên hoặc lối đi bộ nhé.'
            }
          },
          {
            e: '🚶',
            en: 'On the pavement right next to a busy road',
            vi: 'Trên vỉa hè sát con đường đông xe',
            v: 'ok',
            why: {
              en: 'The pavement is much better than the road. A park, away from traffic, is even safer for practising.',
              vi: 'Vỉa hè tốt hơn lòng đường nhiều. Tập xe ở công viên, xa dòng xe, còn an toàn hơn nữa.'
            }
          }
        ],
        lesson: {
          en: 'Ride in parks and on paths away from cars, with a grown-up nearby. Never on the road.',
          vi: 'Chạy xe ở công viên và lối đi xa xe cộ, có người lớn ở gần. Không bao giờ chạy dưới lòng đường.'
        }
      },
      {
        id: 'ride-motorbike-helmet',
        tier: 2,
        region: 'VN',
        scene: '🛵⛑️🧒',
        pic: { bg: 'street', cast: [{ e: '👨', size: 'l', say: { en: "Let's go see Grandma!", vi: 'Mình sang nhà bà nhé!' } }, { e: '🧒', you: true, think: '⛑️😣' }, { e: '🛵', size: 'l' }] },
        q: {
          en: 'In Vietnam, Uncle is taking you to see Grandma on his motorbike. Your helmet strap feels too tight. What do you do?',
          vi: 'Ở Việt Nam, chú chở con sang nhà bà bằng xe máy. Quai mũ bảo hiểm của con hơi chật. Con làm gì?'
        },
        choices: [
          {
            e: '⛑️',
            en: 'Keep the helmet on and ask Uncle to loosen the strap a little',
            vi: 'Vẫn đội mũ và nhờ chú nới quai ra một chút',
            v: 'best',
            why: {
              en: 'The helmet stays on and buckled, and Uncle can make it comfy: snug, but not too tight.',
              vi: 'Mũ vẫn đội và cài quai, chú sẽ chỉnh cho con dễ chịu: vừa khít, không quá chật.'
            }
          },
          {
            e: '🔓',
            en: 'Unbuckle the strap and leave it open',
            vi: 'Tháo quai ra và để mở',
            v: 'no',
            why: {
              en: 'With the strap open, the helmet can come off in a bump. It only protects you when it is buckled.',
              vi: 'Quai không cài thì mũ có thể văng ra khi xe xóc. Mũ chỉ bảo vệ con khi đã cài quai.'
            }
          },
          {
            e: '🙅',
            en: "Take the helmet off, because Grandma's house is close",
            vi: 'Bỏ mũ ra, vì nhà bà gần mà',
            v: 'no',
            why: {
              en: 'On a motorbike, everyone wears a helmet on every ride, near or far.',
              vi: 'Ngồi xe máy thì ai cũng phải đội mũ bảo hiểm, đi gần hay đi xa cũng vậy.'
            }
          }
        ],
        lesson: {
          en: 'On a motorbike, always wear a helmet with the strap buckled, even for a short ride.',
          vi: 'Ngồi xe máy là luôn đội mũ bảo hiểm và cài quai, kể cả khi đi gần.'
        }
      },
      {
        id: 'playground-swings',
        tier: 3,
        scene: '🌳🧒↪️',
        pic: { bg: 'playground', cast: [{ e: '🧒', x: 20, up: 40 }, { e: '🧒', you: true, x: 50, think: '🪣' }] },
        q: {
          en: 'You want to get to the sandpit. The quickest way is right in front of the moving swings. What do you do?',
          vi: 'Con muốn sang chỗ hố cát. Đường nhanh nhất là đi ngang ngay trước mấy chiếc xích đu đang đung đưa. Con làm gì?'
        },
        choices: [
          {
            e: '↪️',
            en: 'Walk the long way round, far from the swings',
            vi: 'Đi vòng xa, tránh xa xích đu',
            v: 'best',
            why: {
              en: 'A moving swing comes back fast and could knock you over. Going round keeps you safe.',
              vi: 'Xích đu đang đung đưa quay lại rất nhanh, có thể va làm con ngã. Đi vòng là an toàn.'
            }
          },
          {
            e: '🏃',
            en: 'Run quickly between the swings',
            vi: 'Chạy thật nhanh băng qua giữa các xích đu',
            v: 'no',
            why: {
              en: 'Swings move faster than you think. Even running, you could get bumped. Go around instead.',
              vi: 'Xích đu chuyển động nhanh hơn con nghĩ. Dù chạy nhanh, con vẫn có thể bị va trúng. Con đi vòng nhé.'
            }
          },
          {
            e: '🖐️',
            en: 'Ask the children on the swings to stop, then walk across',
            vi: 'Nhờ các bạn đang chơi xích đu dừng lại, rồi đi ngang qua',
            v: 'ok',
            why: {
              en: 'Asking is polite, and better than running past. But a swing can start moving again at any moment, so walking round is safest.',
              vi: 'Hỏi như vậy là lịch sự, và tốt hơn chạy ngang qua. Nhưng xích đu có thể đung đưa lại bất cứ lúc nào, nên đi vòng là an toàn nhất.'
            }
          }
        ],
        lesson: {
          en: 'Never walk in front of or behind moving swings. Go the long way round.',
          vi: 'Không đi ngang trước hay sau xích đu đang đung đưa. Hãy đi vòng xa.'
        }
      }
    ]
  }
];
