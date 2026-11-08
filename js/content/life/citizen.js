// World: citizen — see README.md in this folder for the format.
export const TOPICS = [
  // ------------------------------------------------------------------ public manners
  {
    id: 'life.public-manners',
    world: 'citizen',
    icon: '🚌',
    title: 'Good manners in public',
    vi: 'Lịch sự nơi công cộng',
    goal: 'Con biết xếp hàng, giữ yên lặng nơi cần yên tĩnh, nhường ghế, giữ thang máy giúp người khác và tự trả khay sau khi ăn.',
    talk: [
      'Ở thư viện, rạp phim hay trên xe buýt, mình nên nói chuyện thế nào?',
      'Trên tàu xe, ai là người cần được nhường ghế? Vì sao?',
      'Ăn xong ở hawker centre, nhà mình làm gì với khay và bát đĩa?'
    ],
    scenarios: [
      {
        id: 'inpublic-queue',
        tier: 1,
        value: 'respect',
        scene: '🍦👥⏳',
        pic: { bg: 'mall', cast: [{ e: '🧑', size: 'l' }, { e: '👩', size: 'l' }, { e: '🧒', you: true, think: '🍦' }], props: ['🍦'] },
        q: {
          en: 'There is a long queue at the ice cream shop. You really want an ice cream! What do you do?',
          vi: 'Ở tiệm kem có một hàng dài người đang xếp hàng. Con rất muốn ăn kem! Con làm gì?'
        },
        choices: [
          {
            e: '🏃',
            en: 'Squeeze in at the front',
            vi: 'Chen lên đầu hàng',
            v: 'no',
            why: {
              en: "The people who waited a long time would feel it's unfair. Cutting the queue isn't kind.",
              vi: 'Những người đã chờ lâu sẽ thấy không công bằng. Chen ngang là không lịch sự.'
            }
          },
          {
            e: '⏳',
            en: 'Join the end of the queue and wait',
            vi: 'Đứng vào cuối hàng và chờ đến lượt',
            v: 'best',
            why: {
              en: 'Everyone in the queue is waiting too. Taking turns is fair for everybody.',
              vi: 'Mọi người trong hàng cũng đang chờ như con. Lần lượt thì công bằng cho tất cả.'
            }
          },
          {
            e: '😫',
            en: 'Whine loudly until people let you go first',
            vi: 'Mè nheo thật to để mọi người cho mình lên trước',
            v: 'no',
            why: {
              en: "Whining doesn't make the queue move faster, and it isn't fair to people waiting nicely.",
              vi: 'Mè nheo không làm hàng đi nhanh hơn, mà còn không công bằng với những người đang kiên nhẫn chờ.'
            }
          }
        ],
        lesson: {
          en: "Queue up and wait your turn. Everyone's time matters, not just ours.",
          vi: 'Xếp hàng và chờ đến lượt. Thời gian của ai cũng quý như nhau.'
        }
      },
      {
        id: 'inpublic-library',
        tier: 1,
        value: 'respect',
        scene: '📚🤫👀',
        pic: {
          bg: 'library',
          cast: [{ e: '🧒', you: true, think: '😂' }, { e: '👵', size: 'l', think: '📖' }, { e: '👨', size: 'l', x: 88 }],
          props: ['📕']
        },
        q: {
          en: 'At the library, you find a really funny book. You want Daddy to see it. He is at the next shelf. What do you do?',
          vi: 'Ở thư viện, con tìm được một quyển sách rất vui. Con muốn bố xem. Bố đang ở kệ sách bên cạnh. Con làm gì?'
        },
        choices: [
          {
            e: '📢',
            en: 'Shout, "Daddy! Come and look!"',
            vi: 'Gọi to: "Bố ơi! Lại đây xem này!"',
            v: 'no',
            why: {
              en: 'Libraries are quiet places. A shout can make everyone jump and lose their place in their book.',
              vi: 'Thư viện là nơi yên tĩnh. Gọi to sẽ làm mọi người giật mình và mất tập trung.'
            }
          },
          {
            e: '🏃',
            en: 'Run over to Daddy, laughing out loud',
            vi: 'Chạy lại chỗ bố, vừa chạy vừa cười to',
            v: 'no',
            why: {
              en: 'Running can bump into people, and loud laughing disturbs readers.',
              vi: 'Chạy dễ va vào người khác, cười to làm phiền người đang đọc.'
            }
          },
          {
            e: '🤫',
            en: 'Walk over to Daddy and whisper',
            vi: 'Đi nhẹ lại chỗ bố và nói thầm',
            v: 'best',
            why: {
              en: 'Whispering lets everyone else keep reading in peace — and Daddy still gets to see your book.',
              vi: 'Nói thầm để mọi người vẫn đọc sách yên tĩnh — mà bố vẫn được xem sách của con.'
            }
          }
        ],
        lesson: {
          en: 'In quiet places like the library, walk softly and whisper, so everyone can enjoy it.',
          vi: 'Ở nơi cần yên tĩnh như thư viện, hãy đi nhẹ, nói khẽ để ai cũng thấy dễ chịu.'
        }
      },
      {
        id: 'inpublic-seat',
        tier: 2,
        value: 'care',
        scene: '🚌👴💺',
        pic: { bg: 'bus', cast: [{ e: '🧒', you: true, think: '❓' }, { e: '👩', size: 'l' }, { e: '👴', size: 'l', x: 85 }] },
        q: {
          en: 'You are sitting on a busy bus. An elderly uncle with a walking stick gets on. There are no empty seats. What do you do?',
          vi: 'Con đang ngồi trên một chuyến xe buýt đông người. Một ông cụ chống gậy bước lên. Không còn ghế trống. Con làm gì?'
        },
        choices: [
          {
            e: '😴',
            en: 'Pretend to be asleep',
            vi: 'Giả vờ ngủ',
            v: 'no',
            why: {
              en: 'The uncle could lose his balance when the bus stops suddenly. Giving your seat is a small thing that helps a lot.',
              vi: 'Ông có thể mất thăng bằng khi xe phanh gấp. Nhường ghế là việc nhỏ mà giúp được rất nhiều.'
            }
          },
          {
            e: '💺',
            en: 'Offer your seat: "Uncle, please sit here!"',
            vi: 'Nhường ghế: "Ông ơi, ông ngồi đây ạ!"',
            v: 'best',
            why: {
              en: 'Standing is much harder for the uncle than for you. Then hold on to Mummy or a pole, so you stay steady when the bus moves.',
              vi: 'Đứng sẽ mệt cho ông hơn con nhiều. Rồi con bám vào mẹ hoặc cột để không bị ngã khi xe chạy.'
            }
          },
          {
            e: '👀',
            en: 'Wait to see if a grown-up gives up a seat first',
            vi: 'Chờ xem có người lớn nào nhường ghế trước không',
            v: 'ok',
            why: {
              en: "Grown-ups can help too! But anyone can be kind — you don't need to wait.",
              vi: 'Người lớn cũng có thể nhường! Nhưng ai cũng có thể làm việc tốt — con không cần chờ.'
            }
          }
        ],
        lesson: {
          en: 'Offer your seat to people who need it more: older people, pregnant women, people carrying babies, or anyone who is hurt.',
          vi: 'Hãy nhường ghế cho người cần hơn: người già, phụ nữ mang thai, người bế em bé hoặc người bị đau.'
        }
      },
      {
        id: 'inpublic-tray',
        tier: 2,
        region: 'SG',
        value: 'responsibility',
        scene: '🍜🍽️🙋',
        pic: { bg: 'hawker', cast: [{ e: '🧒', you: true, think: '❓' }, { e: '👨', size: 'l' }], props: ['🍜', '🥤', '🍽️'] },
        q: {
          en: 'You and Daddy finish eating at the hawker centre. Your bowls and cups are still on the table. What do you do?',
          vi: 'Con và bố ăn xong ở hawker centre. Bát đĩa, cốc vẫn còn trên bàn. Con làm gì?'
        },
        choices: [
          {
            e: '🍽️',
            en: 'Stack the bowls neatly and leave them for the cleaners',
            vi: 'Xếp gọn bát đĩa rồi để đó cho cô chú dọn dẹp',
            v: 'ok',
            why: {
              en: 'Stacking is tidy — thank you! But cleaners have so many tables to clear. In Singapore, everyone returns their own tray.',
              vi: 'Xếp gọn là tốt — cảm ơn con! Nhưng cô chú dọn dẹp có rất nhiều bàn. Ở Singapore, ai cũng tự trả khay của mình.'
            }
          },
          {
            e: '🙋',
            en: 'Help Daddy carry the tray to the tray return point',
            vi: 'Giúp bố mang khay ra chỗ trả khay',
            v: 'best',
            why: {
              en: "Returning your tray is the rule at Singapore's hawker centres, and it keeps the table clean for the next family.",
              vi: 'Tự trả khay là quy định ở các hawker centre của Singapore, và giúp bàn sạch cho gia đình đến sau.'
            }
          },
          {
            e: '🚶',
            en: 'Just leave — the cleaners will clear it',
            vi: 'Cứ thế đi về — đã có cô chú dọn',
            v: 'no',
            why: {
              en: 'The next family would have to sit at a messy table, and birds might come for the leftovers.',
              vi: 'Gia đình đến sau sẽ phải ngồi bàn bừa bộn, và chim có thể sà xuống ăn thức ăn thừa.'
            }
          }
        ],
        lesson: {
          en: 'Clean up after yourself: return your tray and dishes, so the table is ready for the next person.',
          vi: 'Ăn xong tự dọn: trả khay và bát đĩa để bàn sạch cho người sau.'
        }
      },
      {
        id: 'inpublic-lift',
        tier: 2,
        value: 'care',
        scene: '🏢🚪🛍️',
        pic: {
          bg: 'lift',
          cast: [
            { e: '🧒', you: true, think: '❓' },
            { e: '👩', size: 'l' },
            { e: '👵', size: 'l', x: 88, say: { en: 'Wait for me, please!', vi: 'Chờ bác với!' } }
          ],
          props: ['🛍️']
        },
        q: {
          en: 'You and Mummy are in the lift. The doors start to close, and a neighbour with heavy shopping bags is hurrying over. What do you do?',
          vi: 'Con và mẹ đang ở trong thang máy. Cửa bắt đầu đóng thì có một bác hàng xóm xách túi đồ nặng vội đi tới. Con làm gì?'
        },
        choices: [
          {
            e: '✋',
            en: 'Put your hand between the doors to stop them',
            vi: 'Thò tay vào giữa hai cánh cửa để chặn lại',
            v: 'no',
            why: {
              en: 'Lift doors are strong and could squeeze your hand. The open button is the safe way.',
              vi: 'Cửa thang máy rất khoẻ, có thể kẹp tay con. Dùng nút mở cửa mới an toàn.'
            }
          },
          {
            e: '⏩',
            en: 'Quickly press the "close door" button',
            vi: 'Bấm nhanh nút đóng cửa',
            v: 'no',
            why: {
              en: 'Your neighbour would have to wait with heavy bags. Holding the lift is a kind thing to do.',
              vi: 'Bác sẽ phải xách túi nặng đứng chờ. Giữ thang máy cho người khác là việc làm tử tế.'
            }
          },
          {
            e: '🔘',
            en: 'Press the "open door" button (◀|▶) and wait',
            vi: 'Bấm nút mở cửa (◀|▶) và chờ bác',
            v: 'best',
            why: {
              en: "The button holds the doors safely, and your neighbour doesn't have to wait for the next lift.",
              vi: 'Nút bấm giữ cửa một cách an toàn, và bác không phải chờ chuyến sau.'
            }
          }
        ],
        lesson: {
          en: 'Be a kind neighbour: hold the lift with the open button — never with your hands.',
          vi: 'Làm hàng xóm tốt: giữ thang máy bằng nút mở cửa — không bao giờ dùng tay chặn.'
        }
      },
      {
        id: 'inpublic-park-ball',
        tier: 3,
        value: 'respect',
        scene: '⚽🌳👴',
        pic: {
          bg: 'park',
          cast: [{ e: '👴', size: 'l', x: 14, think: '😟' }, { e: '⚽', size: 's', x: 34 }, { e: '🧒', you: true, think: '🤔' }, { e: '🧒', flip: true }]
        },
        q: {
          en: 'You and {friend} are kicking a ball at the park. An old uncle is resting on a bench nearby. The ball keeps rolling towards the bench. What do you do?',
          vi: 'Con và bạn {friend} đang đá bóng ở công viên. Có một ông cụ đang ngồi nghỉ trên ghế gần đó. Quả bóng cứ lăn về phía ông. Con làm gì?'
        },
        choices: [
          {
            e: '🙏',
            en: 'Say, "Sorry, Uncle!" each time the ball rolls near him',
            vi: 'Mỗi lần bóng lăn tới thì nói: "Cháu xin lỗi ông ạ!"',
            v: 'ok',
            why: {
              en: 'Saying sorry is polite! But the ball will keep coming. Moving your game away lets the uncle rest in peace.',
              vi: 'Xin lỗi là lễ phép! Nhưng bóng vẫn sẽ lăn tới. Chuyển ra chỗ khác chơi thì ông mới được nghỉ yên.'
            }
          },
          {
            e: '⚽',
            en: "Keep playing — the uncle can move if he doesn't like it",
            vi: 'Cứ chơi tiếp — ông không thích thì ông đi chỗ khác',
            v: 'no',
            why: {
              en: 'The uncle was there first, and the ball could hit him or make him jump. In shared places, we think of others too.',
              vi: 'Ông ngồi đó trước, mà bóng có thể trúng ông hoặc làm ông giật mình. Ở chỗ chung, mình phải nghĩ cho người khác nữa.'
            }
          },
          {
            e: '↔️',
            en: 'Move your game further away from the bench',
            vi: 'Rủ bạn ra chỗ xa ghế hơn để chơi',
            v: 'best',
            why: {
              en: 'The park is for everyone. Playing a little further away means you still have fun, and the uncle can rest.',
              vi: 'Công viên là chỗ của mọi người. Ra xa một chút thì con vẫn chơi vui, mà ông cũng được nghỉ ngơi.'
            }
          }
        ],
        lesson: {
          en: "Parks and void decks are for everyone. Play in a way that's safe and kind to the people around you.",
          vi: 'Công viên, sảnh chung cư là chỗ của mọi người. Hãy chơi sao cho an toàn và không làm phiền người xung quanh.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ caring for our planet
  {
    id: 'life.planet',
    world: 'citizen',
    icon: '🌱',
    title: 'Caring for our planet',
    vi: 'Yêu quý Trái Đất',
    goal: 'Con biết bỏ rác đúng chỗ, tái chế đúng cách, tiết kiệm nước và điện, và dùng ít túi ni-lông.',
    talk: [
      'Ở nhà mình, con có thể tiết kiệm nước và điện bằng những cách nào?',
      'Thùng tái chế màu xanh dưới nhà nhận những thứ gì? Lần tới mình cùng mang chai lọ xuống bỏ nhé.',
      'Nếu ai cũng vứt một mẩu rác ra công viên, công viên sẽ trông thế nào?'
    ],
    scenarios: [
      {
        id: 'planet-litter',
        tier: 1,
        value: 'responsibility',
        scene: '🍭🌳🗑️',
        pic: { bg: 'park', cast: [{ e: '🧒', you: true, think: '🗑️❓' }], props: ['🍭'] },
        q: {
          en: 'You finish a lollipop at the park. There is no rubbish bin nearby. What do you do with the stick and wrapper?',
          vi: 'Con ăn xong que kẹo mút ở công viên. Gần đó không có thùng rác. Con làm gì với que và vỏ kẹo?'
        },
        choices: [
          {
            e: '🌿',
            en: "Drop them on the grass — they're so small, nobody will notice",
            vi: 'Thả xuống bãi cỏ — có tí xíu, chẳng ai để ý đâu',
            v: 'no',
            why: {
              en: 'If everyone dropped a little rubbish, the park would be covered. Birds might even try to eat it.',
              vi: 'Nếu ai cũng vứt một chút rác, công viên sẽ ngập rác. Chim còn có thể tưởng là thức ăn mà mổ phải.'
            }
          },
          {
            e: '🎒',
            en: 'Keep them in a bag or pocket until you find a bin',
            vi: 'Cất vào túi, khi nào thấy thùng rác thì bỏ vào',
            v: 'best',
            why: {
              en: 'Holding on to rubbish for a little while keeps the park clean for everyone — and for the animals.',
              vi: 'Giữ rác một lúc thôi là công viên sạch đẹp cho mọi người — và cho cả các con vật.'
            }
          },
          {
            e: '🌳',
            en: 'Hide them in a bush',
            vi: 'Nhét vào bụi cây',
            v: 'no',
            why: {
              en: 'Hidden rubbish is still rubbish. It stays there a long time and can harm plants and animals.',
              vi: 'Rác giấu đi thì vẫn là rác. Nó nằm đó rất lâu và có thể làm hại cây cối, con vật.'
            }
          }
        ],
        lesson: {
          en: 'No bin nearby? Keep your rubbish until you find one. Never litter.',
          vi: 'Không có thùng rác gần đó? Giữ rác lại cho đến khi thấy thùng. Không bao giờ xả rác bừa bãi.'
        }
      },
      {
        id: 'planet-tap',
        tier: 1,
        value: 'responsibility',
        scene: '🚰💧😁',
        pic: { bg: 'bathroom', cast: [{ e: '🧒', you: true }], props: ['🚰', '💧', '💧'] },
        q: {
          en: 'You are brushing your teeth, and the tap is running the whole time. What should you do?',
          vi: 'Con đang đánh răng, và vòi nước cứ chảy suốt. Con nên làm gì?'
        },
        choices: [
          {
            e: '💧',
            en: 'Turn it down to a little trickle',
            vi: 'Vặn nhỏ cho nước chảy ri rỉ',
            v: 'ok',
            why: {
              en: 'Less water is better! But a trickle still wastes water. Turning it off is best.',
              vi: 'Ít nước hơn thì tốt hơn! Nhưng chảy ri rỉ vẫn phí nước. Khoá hẳn là tốt nhất.'
            }
          },
          {
            e: '💦',
            en: "Leave it running — there's plenty of water in the tap",
            vi: 'Cứ để chảy — nước nhiều mà',
            v: 'no',
            why: {
              en: "It takes a lot of work to clean water and bring it to our homes. It's too precious to waste.",
              vi: 'Phải mất rất nhiều công sức mới có nước sạch đưa về nhà mình. Nước quý lắm, đừng để phí.'
            }
          },
          {
            e: '🚰',
            en: 'Turn it off while you brush, then on to rinse',
            vi: 'Khoá vòi khi đánh răng, lúc súc miệng mới mở',
            v: 'best',
            why: {
              en: 'Lots of clean water would go down the drain for nothing. Every drop counts!',
              vi: 'Để vòi chảy thì rất nhiều nước sạch trôi đi phí. Giọt nước nào cũng quý!'
            }
          }
        ],
        lesson: {
          en: "Save water: turn off the tap when you're not using it.",
          vi: 'Tiết kiệm nước: khoá vòi khi không dùng.'
        }
      },
      {
        id: 'planet-lights',
        tier: 1,
        value: 'responsibility',
        scene: '💡🚪👋',
        pic: { bg: 'bedroom', cast: [{ e: '🧒', you: true, flip: true, think: '💡' }], props: ['💡'] },
        q: {
          en: 'You are leaving your room to play in the living room. The light and the fan in your room are still on. What do you do?',
          vi: 'Con ra khỏi phòng để chơi ở phòng khách. Đèn và quạt trong phòng con vẫn đang bật. Con làm gì?'
        },
        choices: [
          {
            e: '💡',
            en: 'Switch off the light and the fan',
            vi: 'Tắt đèn và tắt quạt',
            v: 'best',
            why: {
              en: 'Nobody is in the room, so switching off saves electricity and helps our planet.',
              vi: 'Không có ai trong phòng thì tắt đi để tiết kiệm điện và bảo vệ Trái Đất.'
            }
          },
          {
            e: '🌬️',
            en: 'Switch off the light, but leave the fan on',
            vi: 'Tắt đèn nhưng để quạt chạy',
            v: 'ok',
            why: {
              en: 'Switching off the light helps! The fan uses electricity too — switch off everything nobody is using.',
              vi: 'Tắt đèn là giúp được rồi! Quạt cũng tốn điện — cái gì không ai dùng thì tắt hết nhé.'
            }
          },
          {
            e: '🏃',
            en: 'Leave them on for when you come back',
            vi: 'Cứ để đấy, lát quay lại còn dùng',
            v: 'no',
            why: {
              en: 'The light and fan would be working for nobody. You can switch them on again when you come back.',
              vi: 'Đèn và quạt sẽ chạy mà chẳng ai dùng. Khi nào quay lại thì bật lên cũng được.'
            }
          }
        ],
        lesson: {
          en: 'Leaving a room? Switch off the lights and fan. Saving electricity helps the Earth.',
          vi: 'Ra khỏi phòng thì tắt đèn, tắt quạt. Tiết kiệm điện là giúp Trái Đất.'
        }
      },
      {
        id: 'planet-recycle',
        tier: 2,
        value: 'responsibility',
        scene: '🥤♻️🗑️',
        pic: { bg: 'street', cast: [{ e: '🧒', you: true, think: '❓' }, { e: '🗑️', size: 'l' }, { e: '♻️', size: 'l' }], props: ['🥤'] },
        q: {
          en: "You finish a drink in a plastic bottle. Nearby there's a normal bin and a blue recycling bin. What do you do with the bottle?",
          vi: 'Con uống hết một chai nước bằng nhựa. Gần đó có một thùng rác thường và một thùng tái chế màu xanh. Con làm gì với cái chai?'
        },
        choices: [
          {
            e: '🥤',
            en: 'Put it in the recycling bin with some drink still inside',
            vi: 'Bỏ vào thùng tái chế khi trong chai vẫn còn nước',
            v: 'no',
            why: {
              en: "Leftover drink makes the paper in the bin wet and dirty, so it can't be recycled. Empty the bottle first!",
              vi: 'Nước còn trong chai làm giấy trong thùng bị ướt bẩn, không tái chế được nữa. Hãy đổ hết nước trước nhé!'
            }
          },
          {
            e: '🗑️',
            en: 'Put it in the normal bin',
            vi: 'Bỏ vào thùng rác thường',
            v: 'ok',
            why: {
              en: "At least it isn't litter! But in the recycling bin, the bottle could become something new.",
              vi: 'Ít nhất con không xả rác! Nhưng bỏ vào thùng tái chế thì cái chai có thể thành đồ mới.'
            }
          },
          {
            e: '♻️',
            en: 'Empty it, then put it in the recycling bin',
            vi: 'Đổ hết nước, rồi bỏ vào thùng tái chế',
            v: 'best',
            why: {
              en: 'Clean, empty bottles can be made into new things. That means less rubbish for our planet.',
              vi: 'Chai sạch, rỗng có thể làm thành đồ mới. Như vậy Trái Đất bớt được rác.'
            }
          }
        ],
        lesson: {
          en: 'Recycle right: empty bottles and cans go in the recycling bin, so they can become new things.',
          vi: 'Tái chế đúng cách: chai lọ, vỏ lon đã đổ hết nước thì bỏ vào thùng tái chế để làm thành đồ mới.'
        }
      },
      {
        id: 'planet-bag',
        tier: 2,
        value: 'responsibility',
        scene: '🛒🛍️🌏',
        pic: {
          bg: 'supermarket',
          cast: [
            { e: '🧒', you: true, think: '🤔' },
            { e: '👩', size: 'l' },
            { e: '🧑', size: 'l', x: 88, say: { en: 'Do you need a plastic bag?', vi: 'Có cần túi ni-lông không ạ?' } }
          ],
          props: ['🥛']
        },
        q: {
          en: 'You and Mummy are buying just one carton of milk. The cashier asks, "Do you need a plastic bag?" What could you say?',
          vi: 'Con và mẹ chỉ mua một hộp sữa. Cô thu ngân hỏi: "Có cần túi ni-lông không ạ?" Con có thể nói gì?'
        },
        choices: [
          {
            e: '🛍️',
            en: '"Yes, please — just one."',
            vi: '"Dạ có, cho cháu một cái thôi ạ."',
            v: 'ok',
            why: {
              en: 'One bag is better than lots! But for one carton, carrying it or using your own bag saves plastic.',
              vi: 'Một cái thì vẫn hơn nhiều cái! Nhưng chỉ một hộp sữa thì cầm tay hoặc dùng túi mang theo sẽ đỡ tốn nhựa.'
            }
          },
          {
            e: '🙏',
            en: '"No, thank you! We can carry it ourselves."',
            vi: '"Dạ không cần ạ, cháu cảm ơn cô! Nhà cháu tự cầm được."',
            v: 'best',
            why: {
              en: 'One carton is easy to carry or pop in your own bag — and that means less plastic rubbish.',
              vi: 'Một hộp sữa thì cầm tay hoặc bỏ vào túi mang theo là được — Trái Đất bớt được rác nhựa.'
            }
          },
          {
            e: '🎈',
            en: '"Yes! Can I have three bags to play with, please?"',
            vi: '"Có ạ! Cho cháu ba cái túi để chơi nhé!"',
            v: 'no',
            why: {
              en: "Plastic bags take a very, very long time to break down. And plastic bags aren't toys — playing with them isn't safe.",
              vi: 'Túi ni-lông phải rất rất lâu mới phân huỷ. Mà túi ni-lông không phải đồ chơi — chơi với túi rất nguy hiểm.'
            }
          }
        ],
        lesson: {
          en: 'Say "No, thank you" to plastic bags you don\'t need — and bring your own bag.',
          vi: 'Từ chối túi ni-lông khi không cần — và nhớ mang theo túi của mình nhé.'
        }
      },
      {
        id: 'planet-beach',
        tier: 3,
        value: 'care',
        scene: '🏖️🥫🤔',
        pic: { bg: 'beach', cast: [{ e: '🧒', you: true, think: '🤔' }, { e: '👨', size: 'l' }], props: ['🥫', '🥤'] },
        q: {
          en: "At the beach, you see an empty drink can and some plastic wrappers on the sand. They aren't yours. What do you do?",
          vi: 'Ở bãi biển, con thấy một vỏ lon nước và mấy mẩu vỏ nhựa trên cát. Đó không phải rác của con. Con làm gì?'
        },
        choices: [
          {
            e: '🚶',
            en: "Leave them there — you didn't drop them, so it's not your job",
            vi: 'Để đó — mình không vứt thì đâu phải việc của mình',
            v: 'ok',
            why: {
              en: "You didn't drop them, that's true! But the beach belongs to all of us, and helping clean it makes it better for everyone.",
              vi: 'Con không vứt rác, điều đó đúng. Nhưng bãi biển là của chung, cùng dọn sạch thì ai cũng được vui.'
            }
          },
          {
            e: '🏃',
            en: 'Quickly pick them all up by yourself',
            vi: 'Tự chạy đi nhặt hết thật nhanh',
            v: 'no',
            why: {
              en: 'A kind idea — but cans and rubbish can have sharp edges or be dirty. Ask a grown-up to help first.',
              vi: 'Ý tốt đấy — nhưng vỏ lon và rác có thể có cạnh sắc hoặc bẩn. Hãy nhờ người lớn giúp trước.'
            }
          },
          {
            e: '🙋',
            en: 'Pick them up together with your grown-up',
            vi: 'Cùng bố mẹ nhặt lên bỏ vào thùng rác',
            v: 'best',
            why: {
              en: 'You are caring for our planet! A grown-up can check nothing is sharp. Then wash your hands.',
              vi: 'Con thật biết yêu Trái Đất! Bố mẹ sẽ xem giúp có gì sắc nhọn không. Nhặt xong thì rửa tay nhé.'
            }
          },
          {
            e: '⚽',
            en: 'Kick the can into the sea',
            vi: 'Đá vỏ lon xuống biển',
            v: 'no',
            why: {
              en: 'Rubbish in the sea can hurt fish and turtles. It belongs in a bin.',
              vi: 'Rác dưới biển có thể làm hại cá và rùa. Rác phải bỏ vào thùng.'
            }
          }
        ],
        lesson: {
          en: "The Earth is everyone's home. Even if it isn't your rubbish, you can help clean up — safely, with a grown-up.",
          vi: 'Trái Đất là nhà chung. Dù không phải rác của mình, con vẫn có thể giúp dọn — an toàn, cùng người lớn.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ respecting differences
  {
    id: 'life.differences',
    world: 'citizen',
    icon: '🤝',
    title: 'Respecting differences',
    vi: 'Tôn trọng sự khác biệt',
    goal: 'Con hiểu mỗi người có dân tộc, tôn giáo, món ăn, ngôn ngữ và lễ hội khác nhau, và biết tôn trọng, hoà đồng với mọi người — kể cả tự hào về tiếng Việt của mình.',
    talk: [
      'Ở Singapore có những dân tộc nào? Con biết những lễ hội nào của các bạn?',
      'Nhà mình nói tiếng Việt. Con thấy biết hai thứ tiếng có gì hay?',
      'Khi thấy điều gì lạ ở người khác, mình có thể hỏi thế nào cho lịch sự?'
    ],
    scenarios: [
      {
        id: 'differ-hari-raya',
        tier: 1,
        region: 'SG',
        value: 'harmony',
        scene: '🌙🏠🎉',
        pic: {
          bg: 'door',
          cast: [
            { e: '🧒', you: true, think: '❓' },
            { e: '👩', size: 'l' },
            { e: '🧕', size: 'l', x: 85, say: { en: 'Come to our open house!', vi: 'Mời cả nhà sang chơi nhé!' } }
          ],
          props: ['🌙']
        },
        q: {
          en: 'Your neighbours are celebrating Hari Raya. They invite your family to their open house to eat and visit. What do you do?',
          vi: 'Nhà hàng xóm đang đón lễ Hari Raya. Họ mời gia đình con sang nhà chơi và ăn uống. Con làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Say, "That\'s not our festival. I don\'t want to go."',
            vi: 'Nói: "Đó đâu phải lễ của nhà mình. Con không muốn đi."',
            v: 'no',
            why: {
              en: "You don't have to celebrate a festival yourself to join the fun. Your neighbours would love to share it with you.",
              vi: 'Không cần là lễ của nhà mình thì mới chung vui được. Hàng xóm rất muốn chia sẻ niềm vui với con.'
            }
          },
          {
            e: '🙏',
            en: 'Go with your family and say, "Selamat Hari Raya!"',
            vi: 'Sang chơi cùng bố mẹ và chúc: "Selamat Hari Raya!"',
            v: 'best',
            why: {
              en: "Sharing each other's festivals is how neighbours of different races become friends.",
              vi: 'Cùng chung vui ngày lễ của nhau là cách hàng xóm khác dân tộc trở nên thân thiết.'
            }
          },
          {
            e: '🍪',
            en: "Go, but just eat and don't greet anyone",
            vi: 'Sang, nhưng chỉ ăn mà không chào hỏi ai',
            v: 'ok',
            why: {
              en: 'Going is great! A greeting like "Selamat Hari Raya" makes your neighbours feel happy and welcome too.',
              vi: 'Sang chơi là tốt rồi! Thêm một lời chúc "Selamat Hari Raya" thì hàng xóm sẽ càng vui.'
            }
          }
        ],
        lesson: {
          en: 'Singapore has many festivals: Chinese New Year, Hari Raya, Deepavali, Christmas and more. Join in and share the joy!',
          vi: 'Singapore có nhiều lễ hội: Tết Nguyên Đán, Hari Raya, Deepavali, Giáng sinh... Hãy cùng chung vui nhé!'
        }
      },
      {
        id: 'differ-headscarf',
        tier: 1,
        value: 'respect',
        scene: '🧕👀💛',
        pic: {
          bg: 'playground',
          cast: [{ e: '🧒', you: true, think: '🤔' }, { e: '🧒', say: { en: 'That looks weird!', vi: 'Trông kì quá!' } }, { e: '🧕', x: 86 }]
        },
        q: {
          en: 'At the playground, {name} points at a girl wearing a headscarf and says, "That looks weird!" What do you say?',
          vi: 'Ở sân chơi, bạn {name} chỉ vào một bạn gái đội khăn trùm đầu và nói: "Trông kì quá!" Con nói gì?'
        },
        choices: [
          {
            e: '🤐',
            en: 'Say nothing, and just keep playing on the slide',
            vi: 'Không nói gì, cứ tiếp tục chơi cầu trượt',
            v: 'ok',
            why: {
              en: "You didn't join in. But a few kind words can help {name} understand.",
              vi: 'Con không hùa theo. Nhưng vài lời tử tế có thể giúp bạn {name} hiểu ra.'
            }
          },
          {
            e: '💛',
            en: '"It\'s not weird — just different!"',
            vi: '"Có gì kì đâu — chỉ là khác thôi mà!"',
            v: 'best',
            why: {
              en: "Some people wear a headscarf because of their religion. Different isn't weird — it's part of who they are.",
              vi: 'Có người đội khăn vì tôn giáo của mình. Khác biệt không phải là kì lạ — đó là một phần con người họ.'
            }
          },
          {
            e: '😆',
            en: 'Point and laugh too',
            vi: 'Chỉ trỏ và cười theo',
            v: 'no',
            why: {
              en: 'Pointing and laughing at how someone looks can make them feel hurt and unwelcome.',
              vi: 'Chỉ trỏ, cười cợt vẻ ngoài của người khác sẽ làm họ buồn và thấy lạc lõng.'
            }
          }
        ],
        lesson: {
          en: "People look and dress in different ways. Different isn't weird — be kind and respectful to everyone.",
          vi: 'Mỗi người có vẻ ngoài và cách ăn mặc khác nhau. Khác biệt không phải là kì lạ — hãy tôn trọng mọi người.'
        }
      },
      {
        id: 'differ-no-pork',
        tier: 1,
        value: 'respect',
        scene: '🥟🙅🍎',
        pic: {
          bg: 'park',
          cast: [{ e: '🧒', you: true }, { e: '🧒', say: { en: "My family doesn't eat pork.", vi: 'Nhà tớ không ăn thịt lợn.' } }],
          props: ['🥟', '🧺']
        },
        q: {
          en: 'At a picnic, you offer {friend} one of your pork buns. {friend} says, "No, thank you. My family doesn\'t eat pork." What do you say?',
          vi: 'Trong buổi dã ngoại, con mời bạn {friend} một cái bánh bao nhân thịt lợn. Bạn {friend} nói: "Cảm ơn cậu, nhà tớ không ăn thịt lợn." Con nói gì?'
        },
        choices: [
          {
            e: '🤫',
            en: '"Just try a little — nobody will know!"',
            vi: '"Ăn thử tí thôi — có ai biết đâu!"',
            v: 'no',
            why: {
              en: "{friend}'s family doesn't eat pork, and that matters to them. Respect means never pushing someone to break their family's rules.",
              vi: 'Với gia đình bạn {friend}, không ăn thịt lợn là điều quan trọng. Tôn trọng là không bao giờ ép người khác làm trái điều đó.'
            }
          },
          {
            e: '😮',
            en: '"That\'s weird! Pork is yummy!"',
            vi: '"Lạ thế! Thịt lợn ngon mà!"',
            v: 'no',
            why: {
              en: "It isn't weird — just different. Saying that might make {friend} feel left out.",
              vi: 'Có gì lạ đâu — chỉ là khác thôi. Nói vậy có thể làm bạn {friend} thấy lạc lõng.'
            }
          },
          {
            e: '🍎',
            en: '"OK! Would you like some fruit instead?"',
            vi: '"Ừ! Thế cậu ăn hoa quả nhé?"',
            v: 'best',
            why: {
              en: 'Families have different food rules, often because of their religion. Offering something else is perfect.',
              vi: 'Mỗi gia đình có những điều kiêng ăn khác nhau, thường là vì tôn giáo. Mời món khác là hay nhất.'
            }
          }
        ],
        lesson: {
          en: "Families eat different foods for different reasons. Respect what others can and can't eat.",
          vi: 'Mỗi gia đình ăn uống khác nhau vì nhiều lý do. Hãy tôn trọng điều người khác ăn và không ăn.'
        }
      },
      {
        id: 'differ-language',
        tier: 2,
        region: 'SG',
        value: 'harmony',
        scene: '🗣️👂🌏',
        pic: {
          bg: 'playground',
          cast: [
            { e: '🧒', you: true, think: '🤔' },
            { e: '🧒', say: { en: 'Tell them to speak English!', vi: 'Bảo họ nói tiếng Anh đi!' } },
            { e: '🧒', x: 74, think: '💬' },
            { e: '🧒', x: 92, flip: true, think: '💬' }
          ]
        },
        q: {
          en: 'At the playground, two children are chatting in a language you don\'t understand. {friend} says, "Let\'s tell them to speak English!" What do you do?',
          vi: 'Ở sân chơi, hai bạn đang nói chuyện bằng một thứ tiếng con không hiểu. Bạn {friend} bảo: "Mình bảo họ nói tiếng Anh đi!" Con làm gì?'
        },
        choices: [
          {
            e: '😊',
            en: 'Tell {friend}, "It\'s OK — I speak Vietnamese at home too!"',
            vi: 'Nói với bạn {friend}: "Không sao mà — ở nhà tớ cũng nói tiếng Việt đấy!"',
            v: 'best',
            why: {
              en: 'Many families in Singapore speak two or more languages at home. Every language is special.',
              vi: 'Ở Singapore, nhiều gia đình nói hai, ba thứ tiếng ở nhà. Ngôn ngữ nào cũng đáng quý.'
            }
          },
          {
            e: '📢',
            en: 'Go over with {friend} and say, "Speak English!"',
            vi: 'Cùng bạn {friend} đi tới và nói: "Nói tiếng Anh đi!"',
            v: 'no',
            why: {
              en: "They may feel told off for speaking their family's language. That isn't kind or fair.",
              vi: 'Các bạn ấy sẽ thấy bị trách vì nói tiếng của gia đình mình. Như vậy là không tử tế, không công bằng.'
            }
          },
          {
            e: '👂',
            en: 'Decide they must be saying mean things about you',
            vi: 'Nghĩ là chắc họ đang nói xấu mình',
            v: 'no',
            why: {
              en: "Most likely they're just chatting about their day! Not understanding doesn't mean it's about you.",
              vi: 'Rất có thể các bạn chỉ đang kể chuyện vui thôi! Mình không hiểu không có nghĩa là họ nói về mình.'
            }
          }
        ],
        lesson: {
          en: 'Every language is special — including Vietnamese! Never tell people off for speaking their own language.',
          vi: 'Ngôn ngữ nào cũng đáng quý — kể cả tiếng Việt! Đừng bao giờ chê ai vì nói tiếng của họ.'
        }
      },
      {
        id: 'differ-vietnamese',
        tier: 2,
        region: 'SG',
        value: 'resilience',
        scene: '🇻🇳😊🗣️',
        pic: {
          bg: 'playground',
          cast: [
            { e: '👩', size: 'l' },
            { e: '🧒', you: true, say: { en: 'Mẹ ơi, nhìn này!', vi: 'Mẹ ơi, nhìn này!' } },
            { e: '🧒', x: 86, flip: true, say: { en: 'That sounds funny!', vi: 'Nghe buồn cười thế!' } }
          ]
        },
        q: {
          en: 'You are speaking Vietnamese with Mummy at the playground. A child laughs and says, "That sounds funny!" What do you do?',
          vi: 'Con đang nói tiếng Việt với mẹ ở sân chơi. Một bạn cười và nói: "Nghe buồn cười thế!" Con làm gì?'
        },
        choices: [
          {
            e: '🤐',
            en: 'Stop speaking Vietnamese, so nobody ever laughs at you again',
            vi: 'Thôi không nói tiếng Việt nữa, để không ai cười mình',
            v: 'no',
            why: {
              en: 'Vietnamese is part of you and your family. Speaking two languages is like having a superpower!',
              vi: 'Tiếng Việt là một phần của con và gia đình mình. Biết hai thứ tiếng giống như có siêu năng lực đấy!'
            }
          },
          {
            e: '😝',
            en: "Make fun of the child's language too",
            vi: 'Chê lại tiếng nói của bạn ấy',
            v: 'no',
            why: {
              en: "Then you'd both feel hurt. Every language deserves respect — yours too.",
              vi: 'Như vậy cả hai đều buồn. Ngôn ngữ nào cũng đáng được tôn trọng — kể cả tiếng của con.'
            }
          },
          {
            e: '😊',
            en: 'Smile: "It\'s Vietnamese! \'Xin chào\' means hello!"',
            vi: "Mỉm cười: \"Tiếng Việt đấy! 'Xin chào' nghĩa là hello!\"",
            v: 'best',
            why: {
              en: 'You can be proud of your language. Sharing a word can turn a giggle into a new friend.',
              vi: 'Con có thể tự hào về tiếng nói của mình. Chia sẻ một từ có thể biến tiếng cười thành tình bạn.'
            }
          }
        ],
        lesson: {
          en: "Be proud of your language, and respect other people's. Speaking two languages is something special!",
          vi: 'Hãy tự hào về tiếng nói của mình và tôn trọng tiếng nói của người khác. Biết hai thứ tiếng là điều rất đặc biệt!'
        }
      },
      {
        id: 'differ-wheelchair',
        tier: 2,
        value: 'care',
        scene: '♿🧒⚽',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true }, { e: '⚽', size: 's' }, { e: '🧒' }, { e: '🧑‍🦽', x: 88 }] },
        q: {
          en: 'At the playground, a child in a wheelchair is watching you and {friend} play catch. What do you do?',
          vi: 'Ở sân chơi, có một bạn ngồi xe lăn đang nhìn con và bạn {friend} chơi ném bóng. Con làm gì?'
        },
        choices: [
          {
            e: '🤲',
            en: 'Go and push the wheelchair to help, without asking',
            vi: 'Tự đẩy xe lăn giúp bạn mà không hỏi trước',
            v: 'ok',
            why: {
              en: "A kind idea, but always ask first. The wheelchair belongs to that child — they decide.",
              vi: 'Ý tốt đấy, nhưng hãy luôn hỏi trước. Xe lăn là của bạn ấy — bạn ấy mới là người quyết định.'
            }
          },
          {
            e: '⚽',
            en: 'Say hi and ask, "Do you want to play catch with us?"',
            vi: 'Chào bạn và hỏi: "Bạn có muốn chơi ném bóng với bọn mình không?"',
            v: 'best',
            why: {
              en: 'Lots of games can be played together. You can ask how they like to play.',
              vi: 'Nhiều trò có thể chơi chung được. Con có thể hỏi bạn ấy thích chơi thế nào.'
            }
          },
          {
            e: '👀',
            en: 'Stare at the wheelchair',
            vi: 'Nhìn chằm chằm vào chiếc xe lăn',
            v: 'no',
            why: {
              en: 'Staring can make someone feel uncomfortable. A smile and a hello are much friendlier.',
              vi: 'Nhìn chằm chằm làm người khác thấy ngại. Một nụ cười và lời chào thân thiện hơn nhiều.'
            }
          }
        ],
        lesson: {
          en: 'Friends come in all kinds. Include everyone — and always ask before you help.',
          vi: 'Bạn bè có đủ mọi kiểu. Hãy rủ mọi người cùng chơi — và luôn hỏi trước khi giúp.'
        }
      },
      {
        id: 'differ-prayer',
        tier: 3,
        value: 'respect',
        scene: '🍽️🙏🤔',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true, think: '❓' }, { e: '🧒', think: '🙏' }, { e: '👩', size: 'l', think: '🙏' }, { e: '👨', size: 'l', think: '🙏' }],
          props: ['🍲', '🍚']
        },
        q: {
          en: "You're having dinner at {friend}'s home. Before eating, {friend}'s family closes their eyes to pray. Your family doesn't do this. What do you do?",
          vi: 'Con ăn tối ở nhà bạn {friend}. Trước khi ăn, cả nhà bạn nhắm mắt cầu nguyện. Nhà con thì không làm vậy. Con làm gì?'
        },
        choices: [
          {
            e: '❓',
            en: 'Ask, "What are you doing?" while they are praying',
            vi: 'Hỏi "Mọi người đang làm gì thế?" ngay lúc cả nhà bạn đang cầu nguyện',
            v: 'ok',
            why: {
              en: "Being curious is good! Just wait until they finish to ask — then they'll be happy to tell you.",
              vi: 'Tò mò là tốt! Nhưng hãy chờ mọi người xong rồi hãy hỏi — lúc đó cả nhà sẽ vui vẻ kể cho con nghe.'
            }
          },
          {
            e: '🍗',
            en: "Start eating — you're hungry, and it's not your religion",
            vi: 'Cứ ăn trước — con đói, mà nhà mình đâu theo đạo đó',
            v: 'no',
            why: {
              en: "Waiting a moment is good manners in any home. It shows respect for {friend}'s family.",
              vi: 'Chờ một chút là phép lịch sự ở bất cứ nhà nào. Như vậy là con tôn trọng gia đình bạn {friend}.'
            }
          },
          {
            e: '🤫',
            en: 'Sit quietly and wait until they finish, then eat',
            vi: 'Ngồi yên chờ cả nhà bạn cầu nguyện xong rồi mới ăn',
            v: 'best',
            why: {
              en: "You don't have to pray too. Just being quiet shows you respect their family's ways.",
              vi: 'Con không cần cầu nguyện theo. Chỉ cần ngồi yên lặng là đã thể hiện con tôn trọng nếp nhà của bạn.'
            }
          },
          {
            e: '😆',
            en: 'Giggle and whisper to {friend}',
            vi: 'Cười khúc khích và thì thầm với bạn {friend}',
            v: 'no',
            why: {
              en: "Praying is special to {friend}'s family. Giggling might make them feel you don't respect it.",
              vi: 'Cầu nguyện là điều quan trọng với gia đình bạn {friend}. Cười khúc khích có thể khiến mọi người nghĩ con không tôn trọng.'
            }
          }
        ],
        lesson: {
          en: "Families have different religions and ways. You don't have to do the same — just be quiet and respectful.",
          vi: 'Mỗi gia đình có tôn giáo và nếp sống riêng. Con không cần làm giống — chỉ cần lặng lẽ và tôn trọng.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ helping at home
  {
    id: 'life.chores',
    world: 'citizen',
    icon: '🏠',
    title: 'Helping at home',
    vi: 'Phụ giúp việc nhà',
    goal: 'Con hiểu nhà là của cả gia đình nên con cũng góp tay: dọn đồ chơi, bày bát đũa, gấp quần áo, quan tâm người thân — và chọn việc an toàn.',
    talk: [
      'Con tự làm được những việc nhà nào? Mình cùng chọn một "việc của con" mỗi ngày nhé.',
      'Khi bố hoặc mẹ mệt, con có thể làm gì để giúp?',
      'Trong bếp, việc nào con làm được an toàn, việc nào phải để người lớn làm?'
    ],
    scenarios: [
      {
        id: 'chores-toys',
        tier: 1,
        value: 'responsibility',
        scene: '🧸🧩🧺',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😅' }], props: ['🧸', '🧩', '🚗'] },
        q: {
          en: 'You have finished playing. Your toys are all over the living room floor. What do you do?',
          vi: 'Con chơi xong rồi. Đồ chơi bày khắp sàn phòng khách. Con làm gì?'
        },
        choices: [
          {
            e: '🛋️',
            en: 'Push them all under the sofa',
            vi: 'Đẩy hết xuống gầm ghế sô-pha',
            v: 'no',
            why: {
              en: "Hiding toys isn't tidying. They could get lost or broken under there.",
              vi: 'Giấu đi thì đâu phải là dọn. Đồ chơi có thể bị mất hoặc hỏng dưới đó.'
            }
          },
          {
            e: '🧺',
            en: 'Put the toys back where they belong',
            vi: 'Cất đồ chơi về đúng chỗ',
            v: 'best',
            why: {
              en: 'Now nobody trips over them, and you can find them easily next time.',
              vi: 'Giờ không ai bị vấp ngã, và lần sau con dễ tìm đồ chơi hơn.'
            }
          },
          {
            e: '🏃',
            en: 'Leave them for Mummy to tidy',
            vi: 'Để đó cho mẹ dọn',
            v: 'no',
            why: {
              en: 'You played with them, so tidying is your job. Mummy has lots of other jobs to do.',
              vi: 'Con chơi thì con dọn nhé. Mẹ còn bao nhiêu việc khác phải làm.'
            }
          }
        ],
        lesson: {
          en: 'Played with it? Put it back. Tidying up is your job too.',
          vi: 'Chơi xong thì cất. Dọn dẹp cũng là việc của con.'
        }
      },
      {
        id: 'chores-table',
        tier: 1,
        value: 'responsibility',
        scene: '🍽️🥢🙋',
        pic: {
          bg: 'kitchen',
          cast: [{ e: '👩', size: 'l', say: { en: 'Dinner in five minutes!', vi: 'Năm phút nữa ăn cơm nhé!' } }, { e: '🧒', you: true, think: '🤔' }],
          props: ['🥢', '🥣']
        },
        q: {
          en: 'Mummy is cooking dinner. She calls, "Dinner in five minutes!" What can you do to help?',
          vi: 'Mẹ đang nấu cơm tối. Mẹ gọi: "Năm phút nữa ăn cơm nhé!" Con có thể giúp gì?'
        },
        choices: [
          {
            e: '📺',
            en: 'Keep watching TV until Mummy calls you to eat',
            vi: 'Xem TV tiếp đến khi mẹ gọi ăn',
            v: 'ok',
            why: {
              en: "Coming when you're called is good! But helping before you're asked is even better.",
              vi: 'Được gọi là đến thì cũng tốt! Nhưng tự giác giúp trước khi được nhờ thì còn tốt hơn.'
            }
          },
          {
            e: '📢',
            en: 'Sit at the table and call, "I\'m hungry! Hurry up!"',
            vi: 'Ngồi vào bàn và gọi: "Con đói rồi! Mẹ nhanh lên!"',
            v: 'no',
            why: {
              en: 'Mummy is already working hard. Helping is kinder than hurrying her.',
              vi: 'Mẹ đang vất vả rồi. Giúp mẹ thì tốt hơn là giục mẹ.'
            }
          },
          {
            e: '🥢',
            en: 'Set out the bowls, spoons and chopsticks on the table',
            vi: 'Bày bát, thìa và đũa ra bàn',
            v: 'best',
            why: {
              en: 'When everyone helps a little, the family can sit down and eat together sooner.',
              vi: 'Mỗi người giúp một tay thì cả nhà được ngồi vào ăn sớm hơn.'
            }
          }
        ],
        lesson: {
          en: 'Family is a team. Help without being asked — like setting the table.',
          vi: 'Gia đình là một đội. Hãy tự giác giúp đỡ — như bày bát đũa ra bàn.'
        }
      },
      {
        id: 'chores-unwell',
        tier: 2,
        value: 'care',
        scene: '🤒🛋️🥛',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🎲' }, { e: '👩', size: 'l', think: '🤕' }] },
        q: {
          en: 'Mummy has a bad headache and is lying down. You want her to play with you. What do you do?',
          vi: 'Mẹ bị đau đầu và đang nằm nghỉ. Con muốn mẹ chơi với con. Con làm gì?'
        },
        choices: [
          {
            e: '🎲',
            en: 'Keep asking, "Mummy, please play with me! Just one game!"',
            vi: 'Cứ nằn nì: "Mẹ ơi, chơi với con một ván thôi mà!"',
            v: 'no',
            why: {
              en: 'Mummy wants to play with you, but she needs rest to get better. Asking again and again makes resting hard.',
              vi: 'Mẹ cũng muốn chơi với con, nhưng mẹ cần nghỉ để khỏi ốm. Con cứ nằn nì thì mẹ khó nghỉ lắm.'
            }
          },
          {
            e: '🤫',
            en: 'Play quietly, and ask if she would like a glass of water',
            vi: 'Chơi nhẹ nhàng và hỏi mẹ có muốn uống cốc nước không',
            v: 'best',
            why: {
              en: "Quiet time helps Mummy rest and feel better sooner. You can play together when she's well again.",
              vi: 'Yên tĩnh giúp mẹ nghỉ ngơi và mau khoẻ. Khi mẹ khoẻ rồi, hai mẹ con lại chơi cùng nhau.'
            }
          },
          {
            e: '🔊',
            en: 'Turn on the TV, nice and loud',
            vi: 'Bật TV thật to',
            v: 'no',
            why: {
              en: 'Loud noise can make a headache worse. Quiet helps Mummy rest.',
              vi: 'Tiếng ồn có thể làm mẹ đau đầu hơn. Yên tĩnh mới giúp mẹ nghỉ ngơi.'
            }
          }
        ],
        lesson: {
          en: 'When someone in the family is unwell, be quiet, be gentle, and ask how you can help.',
          vi: 'Khi người thân bị ốm, hãy giữ yên lặng, nhẹ nhàng và hỏi xem con giúp được gì.'
        }
      },
      {
        id: 'chores-laundry',
        tier: 2,
        value: 'responsibility',
        scene: '🧱👕👨',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true, think: '🧱' }, { e: '👨', size: 'l', say: { en: 'Can you help me fold?', vi: 'Con giúp bố gấp đồ nhé?' } }],
          props: ['👕', '🧦', '🧱']
        },
        q: {
          en: 'You are building with blocks. Daddy asks, "Can you help me fold the laundry?" What do you do?',
          vi: 'Con đang xếp hình. Bố hỏi: "Con giúp bố gấp quần áo được không?" Con làm gì?'
        },
        choices: [
          {
            e: '👕',
            en: 'Say, "OK, Daddy!" and go and help',
            vi: 'Nói: "Dạ vâng ạ!" rồi ra giúp bố',
            v: 'best',
            why: {
              en: 'Your blocks will still be there. Folding together is faster — and more fun!',
              vi: 'Đồ xếp hình vẫn ở đó mà. Cùng nhau gấp thì nhanh hơn — và vui hơn!'
            }
          },
          {
            e: '⏳',
            en: 'Ask, "Can I finish this first? Two minutes!" — then really go',
            vi: 'Hỏi: "Cho con xếp nốt cái này nhé, hai phút thôi!" — rồi đi giúp thật',
            v: 'ok',
            why: {
              en: 'Asking politely is fine — as long as you really go! Helping straight away is even better.',
              vi: 'Hỏi lễ phép như vậy cũng được — miễn là con giúp thật! Ra giúp ngay thì còn tốt hơn.'
            }
          },
          {
            e: '🙉',
            en: "Pretend you didn't hear",
            vi: 'Giả vờ không nghe thấy',
            v: 'no',
            why: {
              en: 'Daddy would have to do it all alone. Families help each other.',
              vi: 'Bố sẽ phải làm một mình. Người trong nhà phải giúp đỡ nhau chứ.'
            }
          }
        ],
        lesson: {
          en: 'When family asks for help, say "OK!" and pitch in. Home jobs are for everyone.',
          vi: 'Khi người nhà nhờ, hãy "dạ vâng" và giúp ngay. Việc nhà là việc của cả nhà.'
        }
      },
      {
        id: 'chores-sticker',
        tier: 2,
        value: 'responsibility',
        scene: '⭐🧹🤔',
        pic: {
          bg: 'bedroom',
          cast: [{ e: '🧒', you: true, think: '⭐❓' }, { e: '👩', size: 'l', say: { en: 'Time to tidy your room!', vi: 'Con dọn phòng đi nhé!' } }],
          props: ['🧸', '👕']
        },
        q: {
          en: "Yesterday you got a sticker for tidying your room. Today Mummy asks you to tidy again, but there's no sticker. What do you do?",
          vi: 'Hôm qua con được thưởng một hình dán vì dọn phòng. Hôm nay mẹ lại nhờ con dọn, nhưng không có hình dán. Con làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Say, "No sticker, no tidying! That\'s the deal!"',
            vi: 'Nói: "Không có hình dán thì con không dọn đâu!"',
            v: 'no',
            why: {
              en: "Mummy and Daddy don't get stickers for cooking and cleaning! Everyone helps because they care.",
              vi: 'Bố mẹ nấu cơm, dọn nhà đâu có được hình dán! Ai cũng làm vì thương nhau.'
            }
          },
          {
            e: '🐢',
            en: 'Tidy a little bit, very slowly',
            vi: 'Dọn qua loa một chút cho có',
            v: 'ok',
            why: {
              en: 'A little is better than nothing! But a fully tidy room feels so nice — that good feeling is the prize.',
              vi: 'Một chút còn hơn không! Nhưng phòng gọn gàng hết thì dễ chịu lắm — cảm giác ấy chính là phần thưởng.'
            }
          },
          {
            e: '🧹',
            en: "Tidy up anyway — it's your room",
            vi: 'Vẫn dọn — vì đó là phòng của con mà',
            v: 'best',
            why: {
              en: "We help at home because we're part of the family, not just for prizes. That's real responsibility.",
              vi: 'Mình làm việc nhà vì mình là một thành viên trong gia đình, chứ không chỉ để được thưởng. Thế mới là có trách nhiệm.'
            }
          }
        ],
        lesson: {
          en: "We help at home because we're a family — not just for rewards. A tidy room is its own prize!",
          vi: 'Mình giúp việc nhà vì mình là một gia đình — không phải chỉ để được thưởng. Phòng gọn gàng chính là phần thưởng!'
        }
      },
      {
        id: 'chores-kitchen',
        tier: 3,
        value: 'care',
        scene: '🍳🔥🙋',
        pic: { bg: 'kitchen', cast: [{ e: '👩', size: 'l', think: '😓' }, { e: '🧒', you: true, think: '🙋' }], props: ['🍳', '🐟'] },
        q: {
          en: 'Mummy is frying fish in hot oil. She looks busy and tired. You want to help. What do you do?',
          vi: 'Mẹ đang rán cá trong chảo dầu nóng. Trông mẹ bận rộn và mệt. Con muốn giúp mẹ. Con làm gì?'
        },
        choices: [
          {
            e: '🍳',
            en: 'Stand by the stove and turn the fish over for Mummy',
            vi: 'Đứng cạnh bếp và lật cá giúp mẹ',
            v: 'no',
            why: {
              en: 'A kind thought — but hot oil can spit out and burn you. Choose a job away from the stove.',
              vi: 'Con thật tốt bụng — nhưng dầu nóng có thể bắn ra làm con bỏng. Hãy chọn việc ở xa bếp.'
            }
          },
          {
            e: '🥬',
            en: 'Ask for a safe job, like washing vegetables',
            vi: 'Xin làm một việc an toàn, như rửa rau',
            v: 'best',
            why: {
              en: 'You want to help AND you chose a safe job. Hot oil can burn, so the stove is a grown-up job.',
              vi: 'Con vừa muốn giúp, vừa chọn được việc an toàn. Dầu nóng có thể gây bỏng, nên bếp là việc của người lớn.'
            }
          },
          {
            e: '🛋️',
            en: 'Stay out of the kitchen and play quietly',
            vi: 'Ra khỏi bếp và tự chơi nhẹ nhàng',
            v: 'ok',
            why: {
              en: 'That keeps you safe and lets Mummy cook. But you could help too, with a safe job!',
              vi: 'Như vậy con an toàn và mẹ yên tâm nấu. Nhưng con còn có thể giúp mẹ một việc an toàn nữa!'
            }
          }
        ],
        lesson: {
          en: 'Helping is great — just pick a safe job. Hot stoves, hot oil and knives are for grown-ups.',
          vi: 'Giúp đỡ là rất tốt — hãy chọn việc an toàn. Bếp nóng, dầu nóng và dao là việc của người lớn.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ animals & community helpers
  {
    id: 'life.animals-helpers',
    world: 'citizen',
    icon: '🐾',
    title: 'Kind to animals & helpers',
    vi: 'Thương con vật, quý người lao động',
    goal: 'Con biết đối xử nhẹ nhàng với con vật, chăm vật nuôi có trách nhiệm, và biết ơn, tôn trọng những người làm việc cho cộng đồng.',
    talk: [
      'Hằng ngày có những ai làm việc để khu mình ở sạch đẹp và an toàn? Con có thể cảm ơn họ thế nào?',
      'Vì sao không nên cho chim bồ câu ở công viên ăn?',
      'Nếu nhà mình nuôi một con vật, mỗi ngày con sẽ chăm nó những việc gì?'
    ],
    scenarios: [
      {
        id: 'helpers-cleaner',
        tier: 1,
        value: 'respect',
        scene: '🧹🙂👋',
        pic: { bg: 'street', cast: [{ e: '🧒', you: true }, { e: '👨', size: 'l' }], props: ['🧹'] },
        q: {
          en: 'On the way home, you see the cleaner uncle sweeping the path. He works there every day. What can you do?',
          vi: 'Trên đường về nhà, con thấy bác lao công đang quét đường. Ngày nào bác cũng làm việc ở đó. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🍬',
            en: "Drop your sweet wrapper — it's his job to sweep",
            vi: 'Vứt vỏ kẹo xuống — đằng nào bác chẳng quét',
            v: 'no',
            why: {
              en: "Cleaners aren't there to pick up after us. Keeping places clean is everyone's job.",
              vi: 'Các bác lao công không phải để dọn rác mình cố tình vứt. Giữ sạch nơi ở là việc của tất cả mọi người.'
            }
          },
          {
            e: '🚶',
            en: 'Walk past without saying anything',
            vi: 'Đi qua mà không nói gì',
            v: 'ok',
            why: {
              en: "That isn't unkind. But a hello or a thank-you shows you notice the uncle's hard work.",
              vi: 'Như vậy không có gì sai. Nhưng một lời chào hay lời cảm ơn cho thấy con trân trọng công sức của bác.'
            }
          },
          {
            e: '👋',
            en: 'Smile and say, "Good morning, Uncle! Thank you!"',
            vi: 'Mỉm cười và chào: "Cháu chào bác ạ! Cháu cảm ơn bác!"',
            v: 'best',
            why: {
              en: 'Cleaners work hard to keep our neighbourhood clean. A smile and a thank-you can brighten their day.',
              vi: 'Các bác lao công làm việc vất vả để nơi mình ở sạch sẽ. Một nụ cười và lời cảm ơn làm bác vui cả ngày.'
            }
          }
        ],
        lesson: {
          en: 'Cleaners, bus drivers and other helpers keep our community going. Greet them and say thank you!',
          vi: 'Lao công, tài xế xe buýt và nhiều người khác giúp khu mình ở tốt đẹp hơn. Hãy chào hỏi và cảm ơn họ!'
        }
      },
      {
        id: 'helpers-cat',
        tier: 1,
        value: 'care',
        scene: '🐈💤👀',
        pic: { bg: 'voiddeck', cast: [{ e: '🧒', you: true, think: '🐈❓' }, { e: '🐈', size: 's', think: '💤' }] },
        q: {
          en: "A cat is sleeping at the void deck. You don't know whose cat it is. What do you do?",
          vi: 'Có một chú mèo đang ngủ dưới sảnh chung cư. Con không biết đó là mèo của ai. Con làm gì?'
        },
        choices: [
          {
            e: '👀',
            en: 'Watch it quietly from a little way away',
            vi: 'Đứng cách xa một chút và ngắm thật khẽ',
            v: 'best',
            why: {
              en: "The cat can keep resting, and you stay safe from scratches. Cats you don't know may not like being touched.",
              vi: 'Mèo được ngủ yên, còn con không bị cào. Mèo lạ có thể không thích bị sờ vào.'
            }
          },
          {
            e: '🤗',
            en: 'Pick it up and give it a big hug',
            vi: 'Bế lên và ôm thật chặt',
            v: 'no',
            why: {
              en: "A cat you don't know might scratch or bite if picked up. Only touch an animal when its owner says it's OK.",
              vi: 'Mèo lạ có thể cào hoặc cắn khi bị bế lên. Chỉ chạm vào con vật khi chủ của nó đồng ý.'
            }
          },
          {
            e: '🏃',
            en: 'Run at it to make it jump',
            vi: 'Chạy ào tới cho nó giật mình',
            v: 'no',
            why: {
              en: 'That would scare the cat. Animals can feel frightened, just like us.',
              vi: 'Như vậy mèo sẽ hoảng sợ. Con vật cũng biết sợ, giống như mình.'
            }
          }
        ],
        lesson: {
          en: 'Be gentle with animals. Watch from a distance, and only touch pets when the owner says yes.',
          vi: 'Hãy nhẹ nhàng với con vật. Ngắm từ xa, và chỉ sờ vào khi chủ của chúng đồng ý.'
        }
      },
      {
        id: 'helpers-snail',
        tier: 1,
        value: 'care',
        scene: '🐌🌧️👟',
        pic: {
          bg: 'park',
          cast: [{ e: '🧒', you: true, think: '😟' }, { e: '🐌', size: 's' }, { e: '🧒', flip: true, say: { en: 'Let me step on it!', vi: 'Để tớ giẫm thử!' } }]
        },
        q: {
          en: 'After the rain, a snail is slowly crossing the path. {friend} lifts a foot to step on it. What do you say?',
          vi: 'Sau cơn mưa, một chú ốc sên đang bò chậm chạp qua lối đi. Bạn {friend} giơ chân định giẫm lên. Con nói gì?'
        },
        choices: [
          {
            e: '👟',
            en: '"Do it! Let\'s hear it crunch!"',
            vi: '"Giẫm đi! Xem có kêu rắc không!"',
            v: 'no',
            why: {
              en: 'Stepping on it would hurt the snail. Small creatures deserve kindness too.',
              vi: 'Giẫm lên sẽ làm ốc sên bị thương. Sinh vật nhỏ bé cũng đáng được đối xử tử tế.'
            }
          },
          {
            e: '🐌',
            en: '"Stop! Let\'s walk around it and let it go home."',
            vi: '"Khoan đã! Mình đi vòng qua, để ốc sên về nhà nhé."',
            v: 'best',
            why: {
              en: 'Even tiny animals are living things. Leaving them in peace is the gentle thing to do.',
              vi: 'Con vật bé xíu cũng là sinh vật sống. Để chúng yên là cách đối xử nhẹ nhàng.'
            }
          },
          {
            e: '✋',
            en: 'Pick it up to take home as a pet',
            vi: 'Nhặt về nhà nuôi',
            v: 'no',
            why: {
              en: "The snail's home is outside, where it finds its food. Wild creatures are happiest left where they are.",
              vi: 'Nhà của ốc sên ở ngoài trời, nơi có thức ăn của nó. Sinh vật hoang dã sống vui nhất ở đúng chỗ của chúng.'
            }
          }
        ],
        lesson: {
          en: 'Be gentle with all living things, big and small. Let little creatures go on their way.',
          vi: 'Hãy nhẹ nhàng với mọi sinh vật, dù lớn hay nhỏ. Để các con vật bé nhỏ được đi đường của chúng.'
        }
      },
      {
        id: 'helpers-fish',
        tier: 2,
        value: 'responsibility',
        scene: '🐟🥣⏰',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🧸' }, { e: '🐠', size: 's', up: 20 }], props: ['🥣'] },
        q: {
          en: "Grandma is away for the weekend. Your job is to feed her goldfish every day. Today you're busy playing. What do you do?",
          vi: 'Bà đi vắng mấy ngày cuối tuần. Việc của con là cho cá vàng của bà ăn mỗi ngày. Hôm nay con mải chơi quá. Con làm gì?'
        },
        choices: [
          {
            e: '⏭️',
            en: "Skip today — fish don't eat much",
            vi: 'Hôm nay bỏ qua — cá ăn ít mà',
            v: 'no',
            why: {
              en: "The fish can't get food by themselves. Grandma trusted you to look after them.",
              vi: 'Cá không tự kiếm ăn được. Bà đã tin tưởng giao cho con chăm sóc chúng.'
            }
          },
          {
            e: '🐟',
            en: 'Stop for a moment and feed the fish a small pinch',
            vi: 'Dừng chơi một lát, cho cá ăn một nhúm nhỏ rồi chơi tiếp',
            v: 'best',
            why: {
              en: "Pets need us every day, even when we're busy. Grandma trusted you, and you kept your word.",
              vi: 'Con vật cần mình mỗi ngày, kể cả lúc mình bận. Bà đã tin con, và con đã làm đúng lời.'
            }
          },
          {
            e: '🥣',
            en: 'Pour in lots of food, so you can skip feeding tomorrow',
            vi: 'Đổ thật nhiều thức ăn để mai khỏi phải cho ăn',
            v: 'no',
            why: {
              en: 'Too much food makes the water dirty and can make fish sick. A small pinch each day is best.',
              vi: 'Quá nhiều thức ăn làm nước bẩn và cá có thể bị ốm. Mỗi ngày một nhúm nhỏ là tốt nhất.'
            }
          }
        ],
        lesson: {
          en: 'Looking after an animal is a promise: it needs you every day, in the right way.',
          vi: 'Chăm sóc con vật là một lời hứa: ngày nào nó cũng cần con, và cần con chăm đúng cách.'
        }
      },
      {
        id: 'helpers-drinks',
        tier: 2,
        region: 'SG',
        value: 'respect',
        scene: '🧃🍊😮',
        pic: {
          bg: 'hawker',
          cast: [{ e: '🧒', you: true, think: '🍎❓' }, { e: '👩', size: 'l', say: { en: 'Here you go!', vi: 'Của cháu đây!' } }],
          props: ['🍊', '🥤']
        },
        q: {
          en: 'At the hawker centre, you ask for apple juice. The busy drinks auntie gives you orange juice by mistake. What do you do?',
          vi: 'Ở hawker centre, con gọi nước táo. Cô bán nước đang rất bận nên đưa nhầm nước cam. Con làm gì?'
        },
        choices: [
          {
            e: '😠',
            en: 'Say loudly, "Wrong! You made a mistake!"',
            vi: 'Nói to: "Sai rồi! Cô làm nhầm rồi!"',
            v: 'no',
            why: {
              en: 'Auntie is working hard. Shouting about a mistake can make someone feel bad — a polite voice works better.',
              vi: 'Cô đang làm việc vất vả. Lớn tiếng về lỗi nhầm sẽ làm người ta buồn — nói lễ phép thì tốt hơn.'
            }
          },
          {
            e: '🙏',
            en: 'Politely say, "Auntie, I asked for apple juice."',
            vi: 'Lễ phép nói: "Cô ơi, cháu gọi nước táo ạ."',
            v: 'best',
            why: {
              en: 'Everyone makes mistakes, especially when busy. Asking kindly helps Auntie fix it easily.',
              vi: 'Ai cũng có lúc nhầm, nhất là khi bận. Nói nhẹ nhàng giúp cô dễ sửa lại.'
            }
          },
          {
            e: '🤐',
            en: 'Say nothing and drink the orange juice',
            vi: 'Không nói gì và uống nước cam',
            v: 'ok',
            why: {
              en: "That isn't rude at all! But it's OK to speak up politely when something is wrong — Auntie would want to know.",
              vi: 'Như vậy không hề bất lịch sự! Nhưng khi có gì nhầm, con có thể lễ phép nói ra — cô cũng muốn biết mà.'
            }
          }
        ],
        lesson: {
          en: 'If someone makes a mistake while serving you, speak up kindly and politely. Workers deserve respect.',
          vi: 'Khi người bán hàng nhầm, hãy nói ra nhẹ nhàng, lễ phép. Người lao động đáng được tôn trọng.'
        }
      },
      {
        id: 'helpers-pigeons',
        tier: 3,
        region: 'SG',
        value: 'responsibility',
        scene: '🐦🍞🤔',
        pic: {
          bg: 'park',
          cast: [
            { e: '🧒', you: true, think: '🤔' },
            { e: '🐦', size: 's' },
            { e: '🐦', size: 's' },
            { e: '🧒', flip: true, say: { en: "They look hungry! Let's feed them.", vi: 'Chúng đói kìa! Cho chúng ăn đi.' } }
          ],
          props: ['🍞']
        },
        q: {
          en: 'At the park, lots of pigeons crowd around you. {friend} says, "They look hungry! Let\'s throw them our bread." What do you do?',
          vi: 'Ở công viên, rất nhiều chim bồ câu bu quanh con. Bạn {friend} nói: "Chúng đói kìa! Mình ném bánh mì cho chúng đi." Con làm gì?'
        },
        choices: [
          {
            e: '🍞',
            en: "Throw them all your bread — it's kind!",
            vi: 'Ném hết bánh mì cho chim — thế là tốt bụng mà!',
            v: 'no',
            why: {
              en: "It looks kind, but bread isn't good food for birds, and feeding brings big crowds of pigeons that make places dirty.",
              vi: 'Trông thì tốt bụng, nhưng bánh mì không phải thức ăn tốt cho chim, mà cho ăn còn khiến chim kéo đến rất đông làm bẩn nơi công cộng.'
            }
          },
          {
            e: '💬',
            en: 'Say, "Let\'s not feed them. Wild birds can find their own food."',
            vi: 'Nói: "Mình đừng cho ăn nhé. Chim hoang tự kiếm ăn được mà."',
            v: 'best',
            why: {
              en: 'Feeding makes too many birds crowd together and make a mess. In Singapore, feeding pigeons is against the rules.',
              vi: 'Cho ăn khiến chim tụ tập quá đông và gây bẩn. Ở Singapore, cho chim bồ câu ăn là trái quy định.'
            }
          },
          {
            e: '👀',
            en: "Don't throw any — just watch the birds quietly",
            vi: 'Không ném gì cả — chỉ đứng ngắm chim thôi',
            v: 'ok',
            why: {
              en: "Watching is fine! You can also kindly tell {friend} why it's better not to feed them.",
              vi: 'Ngắm chim là tốt rồi! Con còn có thể nhẹ nhàng giải thích cho bạn {friend} vì sao không nên cho chim ăn.'
            }
          },
          {
            e: '🏃',
            en: 'Chase them to make them fly',
            vi: 'Đuổi cho chim bay hết',
            v: 'no',
            why: {
              en: 'Chasing scares the birds, and you could trip. Just let them be.',
              vi: 'Đuổi chim làm chúng hoảng sợ, mà con có thể vấp ngã. Cứ để chúng yên.'
            }
          }
        ],
        lesson: {
          en: "Being kind to wild animals means letting them be — don't feed them or chase them.",
          vi: 'Thương con vật hoang dã là để chúng tự do — không cho ăn, không đuổi bắt.'
        }
      },
      {
        id: 'helpers-every-job',
        tier: 3,
        value: 'respect',
        scene: '🧹💬🤔',
        pic: {
          bg: 'street',
          cast: [
            { e: '🧒', you: true, think: '🤔' },
            { e: '🧒', say: { en: "Study hard, or you'll sweep floors!", vi: 'Không học chăm thì đi quét rác!' } },
            { e: '👨', size: 'l', x: 88 }
          ],
          props: ['🧹']
        },
        q: {
          en: '{name} sees a cleaner at work and says, "If you don\'t study hard, you\'ll end up sweeping floors!" What do you think?',
          vi: 'Bạn {name} nhìn thấy một bác lao công đang làm việc và nói: "Không học chăm thì sau này phải đi quét rác đấy!" Con nghĩ sao?'
        },
        choices: [
          {
            e: '📚',
            en: '"Yes — I\'m going to study hard!"',
            vi: '"Ừ — tớ sẽ chăm học!"',
            v: 'ok',
            why: {
              en: "Studying hard is great! But it's not a reason to look down on cleaners. Their work matters to all of us.",
              vi: 'Chăm học là rất tốt! Nhưng đó không phải lý do để coi thường các bác lao công. Công việc của họ quan trọng với tất cả chúng ta.'
            }
          },
          {
            e: '😆',
            en: 'Laugh and agree that sweeping floors is a bad job',
            vi: 'Cười và đồng ý rằng quét rác là nghề kém cỏi',
            v: 'no',
            why: {
              en: "Without cleaners, our streets and toilets would be very dirty! Laughing at someone's job can hurt.",
              vi: 'Không có các bác lao công thì đường phố, nhà vệ sinh sẽ bẩn lắm! Cười chê nghề của người khác có thể làm họ buồn.'
            }
          },
          {
            e: '💛',
            en: '"Every job matters. Cleaners help us all!"',
            vi: '"Nghề nào cũng quý. Các bác lao công giúp mọi người mà!"',
            v: 'best',
            why: {
              en: 'Studying is great, but no job is something to look down on. Every worker deserves respect.',
              vi: 'Chăm học là tốt, nhưng không có nghề nào đáng bị coi thường. Người lao động nào cũng đáng được tôn trọng.'
            }
          }
        ],
        lesson: {
          en: 'Every job helps our community. Respect all workers — cleaners, drivers, cooks and more.',
          vi: 'Nghề nào cũng giúp ích cho cộng đồng. Hãy tôn trọng mọi người lao động — lao công, tài xế, đầu bếp...'
        }
      }
    ]
  }
];
