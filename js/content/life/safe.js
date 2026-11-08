// World: safe — see README.md in this folder for the format.
export const TOPICS = [
  // ------------------------------------------------------------------ getting lost
  {
    id: 'life.lost',
    world: 'safe',
    icon: '🧭',
    title: 'If I get lost',
    vi: 'Khi con bị lạc',
    goal: 'Con biết đứng gần chỗ cũ, tự chọn đúng người an toàn để nhờ giúp, không rời khỏi nơi đó và thuộc số điện thoại của bố mẹ.',
    talk: [
      'Nếu con bị lạc trong siêu thị, con sẽ tìm ai để nhờ giúp?',
      'Con có nhớ số điện thoại của bố hoặc mẹ không? Đọc thử cho bố mẹ nghe nhé.',
      'Vì sao khi bị lạc con không nên ra bãi xe hay ra đường để tìm bố mẹ?',
      'Nếu có người tự đến gần bảo "Đi với cô, cô dẫn đi tìm mẹ", con sẽ nói gì?'
    ],
    scenarios: [
      {
        id: 'lost-mall',
        tier: 1,
        scene: '🏬🧒❓',
        pic: { bg: 'mall', cast: [{ e: '🧒', you: true, think: '👩❓' }], props: ['🛍️'] },
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
            e: '🚶',
            en: 'Go with a grown-up who walks up and says they know where Mummy is',
            vi: 'Đi theo một người lạ tự đến gần và nói là biết mẹ con ở đâu',
            v: 'no',
            why: {
              en: 'You get to choose your helper, like a shop worker or a mummy with kids. Never go off with someone who walks up to you.',
              vi: 'Con hãy tự chọn người để nhờ, như nhân viên cửa hàng hoặc một cô đang dẫn con nhỏ. Không đi theo người lạ tự đến gần con.'
            }
          }
        ],
        lesson: {
          en: 'Lost? Stay close, then ask a safe helper: a shop worker at the counter, a security guard, or a mummy with kids.',
          vi: 'Bị lạc? Đứng gần chỗ cũ, rồi nhờ người an toàn: nhân viên ở quầy, chú bảo vệ, hoặc một cô đang dẫn con nhỏ.'
        }
      },
      {
        id: 'lost-supermarket',
        tier: 1,
        scene: '🛒🧸❓',
        pic: { bg: 'supermarket', cast: [{ e: '🧒', you: true, think: '👨❓' }], props: ['🧸'] },
        q: {
          en: 'You are at the supermarket with Daddy. You stop to look at the toys, and now Daddy is gone. What should you do?',
          vi: 'Con đi siêu thị với bố. Con dừng lại xem đồ chơi, giờ thì không thấy bố đâu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🧑‍💼',
            en: 'Ask the cashier at the checkout for help',
            vi: 'Nhờ cô chú thu ngân ở quầy tính tiền giúp',
            v: 'best',
            why: {
              en: 'Cashiers work there. They can call Daddy or make an announcement to find him.',
              vi: 'Cô chú thu ngân làm việc ở đó, có thể gọi điện cho bố hoặc đọc loa tìm bố giúp con.'
            }
          },
          {
            e: '🏃',
            en: 'Run up and down every aisle looking for Daddy',
            vi: 'Chạy khắp các dãy hàng để tìm bố',
            v: 'no',
            why: {
              en: 'If you both keep moving, it is harder to find each other. Stay in one place and get help.',
              vi: 'Nếu cả hai cùng đi lung tung thì càng khó gặp nhau. Con hãy đứng một chỗ và nhờ người giúp.'
            }
          },
          {
            e: '🚪',
            en: 'Go outside the supermarket to wait for Daddy',
            vi: 'Ra ngoài cửa siêu thị đứng chờ bố',
            v: 'no',
            why: {
              en: 'Daddy will look for you inside the shop first, and it is safer for you in there.',
              vi: 'Bố sẽ tìm con trong siêu thị trước, và ở bên trong cũng an toàn hơn.'
            }
          }
        ],
        lesson: {
          en: 'Lost in a shop? Stay inside and ask a worker at the counter. Never leave the shop to look.',
          vi: 'Lạc trong cửa hàng? Ở yên bên trong và nhờ nhân viên ở quầy. Đừng bao giờ ra ngoài để tìm.'
        }
      },
      {
        id: 'lost-playground',
        tier: 1,
        scene: '🛝👵❓',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, think: '👵❓' }] },
        q: {
          en: "You are at the playground. Grandma was sitting on the bench, but now you can't see her. What should you do?",
          vi: 'Con đang chơi ở sân chơi. Lúc nãy bà ngồi ở ghế đá, giờ con không thấy bà đâu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Stay at the playground and ask a mummy with kids to help',
            vi: 'Ở lại sân chơi và nhờ một cô đang trông con nhỏ giúp',
            v: 'best',
            why: {
              en: 'Grandma will come back to the playground first. A mummy with kids can help you look or call.',
              vi: 'Bà sẽ quay lại sân chơi tìm con trước. Cô đang trông con nhỏ có thể giúp con tìm hoặc gọi điện.'
            }
          },
          {
            e: '🏠',
            en: 'Walk home by yourself',
            vi: 'Tự đi bộ về nhà một mình',
            v: 'no',
            why: {
              en: 'Grandma would come back and not find you, and the way home has roads and cars. Stay and get help.',
              vi: 'Bà quay lại sẽ không thấy con, mà đường về nhà lại có xe cộ. Con hãy ở lại và nhờ người giúp.'
            }
          },
          {
            e: '🙈',
            en: 'Hide inside the slide tunnel until Grandma comes back',
            vi: 'Trốn vào trong ống cầu trượt chờ bà quay lại',
            v: 'no',
            why: {
              en: "If you hide, Grandma and the helpers can't see you. Stay where people can see you.",
              vi: 'Nếu con trốn, bà và những người giúp sẽ không nhìn thấy con. Con hãy đứng ở chỗ dễ thấy.'
            }
          }
        ],
        lesson: {
          en: 'Lost at the playground? Stay there, where people can see you, and ask a mummy with kids for help.',
          vi: 'Lạc ở sân chơi? Ở lại chỗ dễ thấy và nhờ một cô đang trông con nhỏ giúp.'
        }
      },
      {
        id: 'lost-mrt',
        tier: 2,
        region: 'SG',
        scene: '🚇👥❓',
        pic: { bg: 'mrt', cast: [{ e: '🧑', size: 'l' }, { e: '🧒', you: true, think: '👨❓' }, { e: '👩', size: 'l' }, { e: '🧔', size: 'l' }] },
        q: {
          en: "The MRT station is very crowded. You were holding Daddy's hand, but now you can't see him. What should you do?",
          vi: 'Ga MRT rất đông. Con đang nắm tay bố, giờ thì không thấy bố đâu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🧑‍✈️',
            en: 'Stay in the station and ask a station staff member in uniform',
            vi: 'Ở lại trong ga và nhờ cô chú nhân viên nhà ga mặc đồng phục',
            v: 'best',
            why: {
              en: 'Station staff help lost children. They can call Daddy and help him find you.',
              vi: 'Nhân viên nhà ga biết cách giúp trẻ bị lạc. Họ có thể gọi cho bố và giúp bố tìm con.'
            }
          },
          {
            e: '🚆',
            en: 'Get on the next train to look for Daddy',
            vi: 'Lên chuyến tàu tiếp theo để đi tìm bố',
            v: 'no',
            why: {
              en: 'The train could take you far away, and then it is much harder for Daddy to find you.',
              vi: 'Tàu có thể chở con đi rất xa, lúc đó bố sẽ khó tìm con hơn nhiều.'
            }
          },
          {
            e: '⬆️',
            en: 'Go up the escalator and out to the street',
            vi: 'Đi thang cuốn lên rồi ra ngoài đường',
            v: 'no',
            why: {
              en: 'Outside is big and busy, with roads and cars. Daddy will look for you inside the station.',
              vi: 'Bên ngoài rộng và đông, lại có xe cộ. Bố sẽ tìm con ở trong ga.'
            }
          }
        ],
        lesson: {
          en: "Lost at the MRT? Don't get on a train or leave the station. Ask the station staff for help.",
          vi: 'Lạc ở ga MRT? Đừng lên tàu, đừng ra khỏi ga. Hãy nhờ nhân viên nhà ga giúp.'
        }
      },
      {
        id: 'lost-beach',
        tier: 2,
        scene: '🏖️🏰❓',
        pic: { bg: 'beach', cast: [{ e: '🧒', you: true, think: '👩❓' }], props: ['🏰', '🪣'] },
        q: {
          en: "At the beach, you are busy building a sandcastle. When you look up, you can't see Mummy anywhere. What should you do?",
          vi: 'Ở bãi biển, con đang mải xây lâu đài cát. Lúc ngẩng lên, con không thấy mẹ đâu cả. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Stay by your sandcastle and ask a mummy with kids nearby to help',
            vi: 'Ở cạnh lâu đài cát và nhờ một cô đang trông con nhỏ gần đó giúp',
            v: 'best',
            why: {
              en: 'Mummy knows where you were playing, so she will come back here. A mummy with kids can help too.',
              vi: 'Mẹ biết con đang chơi ở đây nên sẽ quay lại đây tìm con. Cô đang trông con nhỏ cũng giúp được con.'
            }
          },
          {
            e: '🌊',
            en: 'Walk along the water to look for Mummy',
            vi: 'Đi dọc mép nước để tìm mẹ',
            v: 'no',
            why: {
              en: 'The beach is long, and you could end up far away. Going near the water without a grown-up is not safe either.',
              vi: 'Bãi biển rất dài, con có thể đi lạc xa hơn. Lại gần nước khi không có người lớn cũng không an toàn.'
            }
          },
          {
            e: '📣',
            en: 'Stand still and shout "Mummy!" as loudly as you can',
            vi: 'Đứng yên và gọi thật to "Mẹ ơi!"',
            v: 'ok',
            why: {
              en: 'Staying put is smart, and calling out can help. Asking a grown-up nearby to help is even better.',
              vi: 'Đứng yên là rất đúng, gọi to cũng có ích. Nhưng nhờ một người lớn gần đó giúp thì còn tốt hơn nữa.'
            }
          }
        ],
        lesson: {
          en: 'Lost outdoors? Stay where you were playing, because your grown-up will come back there. Ask a mummy with kids for help.',
          vi: 'Lạc ở ngoài trời? Ở lại chỗ con vừa chơi, vì bố mẹ sẽ quay lại đó. Nhờ một cô đang trông con nhỏ giúp.'
        }
      },
      {
        id: 'lost-phone-number',
        tier: 2,
        scene: '👮📱🔢',
        pic: { bg: 'mall', cast: [{ e: '🧒', you: true, think: '🔢❓' }, { e: '👮', size: 'l', say: { en: "Do you know Mummy or Daddy's number?", vi: 'Con nhớ số điện thoại bố mẹ không?' } }] },
        q: {
          en: "You are lost, and a security guard is helping you. The guard asks, \"Do you know your mummy's or daddy's phone number?\" What do you do?",
          vi: 'Con bị lạc và chú bảo vệ đang giúp con. Chú hỏi: "Con có nhớ số điện thoại của bố hoặc mẹ không?" Con làm gì?'
        },
        choices: [
          {
            e: '🔢',
            en: 'Tell the guard the phone number you learned by heart',
            vi: 'Đọc số điện thoại của bố hoặc mẹ mà con đã thuộc lòng',
            v: 'best',
            why: {
              en: 'Now the guard can call your grown-up straight away.',
              vi: 'Giờ chú bảo vệ có thể gọi ngay cho bố mẹ con.'
            }
          },
          {
            e: '🗣️',
            en: "Tell the guard your mummy's full name",
            vi: 'Nói họ tên đầy đủ của mẹ',
            v: 'ok',
            why: {
              en: 'That helps! But a name alone is hard to find. A phone number lets the guard call Mummy right now.',
              vi: 'Cũng có ích đấy! Nhưng chỉ có tên thì khó tìm. Có số điện thoại thì chú gọi được cho mẹ ngay.'
            }
          },
          {
            e: '🚶',
            en: 'Walk away to look for Mummy by yourself',
            vi: 'Bỏ đi tự tìm mẹ một mình',
            v: 'no',
            why: {
              en: 'The guard is helping you, so stay close. Walking away makes it harder for Mummy to find you.',
              vi: 'Chú bảo vệ đang giúp con, nên con ở gần chú nhé. Bỏ đi thì mẹ càng khó tìm con hơn.'
            }
          }
        ],
        lesson: {
          en: "Learn your grown-up's phone number by heart. Practise saying it at home!",
          vi: 'Hãy thuộc lòng số điện thoại của bố hoặc mẹ. Tập đọc to ở nhà nhé!'
        }
      },
      {
        id: 'lost-helper-car',
        tier: 3,
        scene: '🏬🙋🚗',
        pic: { bg: 'mall', cast: [{ e: '🧒', you: true, think: '❓' }, { e: '👩', size: 'l', say: { en: "Let's find Mummy in my car!", vi: 'Lên xe cô chở đi tìm mẹ nhé!' } }], props: ['🚗'] },
        q: {
          en: "You are lost at the mall. A kind auntie is helping you. Then she says, \"Come, let's drive around in my car to find Mummy.\" What should you do?",
          vi: 'Con bị lạc ở trung tâm thương mại. Một cô tốt bụng đang giúp con, rồi cô nói: "Lên xe cô chở đi vòng vòng tìm mẹ nhé." Con nên làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Say "No, thank you" and ask to wait at the counter for Mummy',
            vi: 'Nói "Dạ thôi, con cảm ơn" và xin ở lại quầy chờ mẹ',
            v: 'best',
            why: {
              en: 'A safe helper keeps you inside the mall. Mummy will come back to look for you there.',
              vi: 'Người giúp an toàn sẽ để con ở lại trong trung tâm. Mẹ sẽ quay lại đó tìm con.'
            }
          },
          {
            e: '🚗',
            en: 'Get in the car, because the auntie is helping you',
            vi: 'Lên xe, vì cô đang giúp con mà',
            v: 'no',
            why: {
              en: 'Even kind people should not take you away in a car. Always check with your grown-up first.',
              vi: 'Người tốt bụng cũng không được đưa con đi bằng xe. Con luôn phải hỏi bố mẹ trước.'
            }
          },
          {
            e: '🚶',
            en: 'Walk outside with the auntie to look for Mummy on the street',
            vi: 'Đi theo cô ra ngoài đường tìm mẹ',
            v: 'no',
            why: {
              en: 'Leaving the mall makes it much harder for Mummy to find you. Stay inside.',
              vi: 'Ra khỏi trung tâm thì mẹ sẽ khó tìm con hơn nhiều. Con hãy ở lại bên trong.'
            }
          }
        ],
        lesson: {
          en: 'When you are lost, stay in that place. Never leave or get into a car, even with a helper.',
          vi: 'Khi bị lạc, con ở yên trong nơi đó. Không rời đi, không lên xe, kể cả với người đang giúp con.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ tricky people / check first
  {
    id: 'life.check-first',
    world: 'safe',
    icon: '✋',
    title: 'Check first!',
    vi: 'Hỏi bố mẹ trước đã!',
    goal: 'Con biết luôn hỏi người lớn của mình trước khi đi đâu, lên xe hay nhận quà, kể cả với người quen, và dám nói "KHÔNG!" thật to.',
    talk: [
      'Nếu một người lớn nhờ con giúp tìm cún bị lạc, con sẽ làm gì? Vì sao người lớn nên nhờ người lớn khác giúp?',
      'Nhà mình đặt một "mật mã gia đình" nhé? Chọn từ gì để dễ nhớ mà người ngoài khó đoán?',
      'Những ai được đón con ở trường? Nếu có người khác đến đón thì con làm gì?',
      'Mình cùng tập nói thật to: "KHÔNG! Con phải hỏi bố mẹ trước!"'
    ],
    scenarios: [
      {
        id: 'check-sweets',
        tier: 1,
        scene: '🍬🧑❓',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, think: '❓' }, { e: '🧑', size: 'l', say: { en: 'Here, these are for you!', vi: 'Cho cháu này!' } }], props: ['🍬'] },
        q: {
          en: 'You are playing downstairs. Someone you don\'t know holds out some sweets and says, "Here, these are for you!" What should you do?',
          vi: 'Con đang chơi ở dưới sân. Một người con không quen chìa ra mấy viên kẹo: "Cho cháu này!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Say "No, thank you" and go and tell your grown-up',
            vi: 'Nói "Dạ thôi, con cảm ơn" rồi đi kể với bố mẹ',
            v: 'best',
            why: {
              en: 'Always check first before you take sweets or a gift, even if they look yummy.',
              vi: 'Luôn hỏi bố mẹ trước khi nhận kẹo hay quà, dù trông ngon đến mấy.'
            }
          },
          {
            e: '🍬',
            en: 'Take the sweets and eat them',
            vi: 'Cầm kẹo và ăn luôn',
            v: 'no',
            why: {
              en: "Sweets from someone you don't know may not be safe, and your grown-up needs to know first.",
              vi: 'Kẹo của người lạ có thể không an toàn, và bố mẹ cần biết trước đã.'
            }
          },
          {
            e: '🤫',
            en: 'Take them and hide them in your pocket for later',
            vi: 'Nhận rồi giấu vào túi để ăn sau',
            v: 'no',
            why: {
              en: 'Your grown-up needs to know about this. Check first, and tell them what happened.',
              vi: 'Bố mẹ cần biết chuyện này. Con hỏi bố mẹ trước, và kể lại chuyện vừa xảy ra.'
            }
          }
        ],
        lesson: {
          en: 'Someone offers you sweets or a gift? Say "No, thank you" and check with your grown-up first.',
          vi: 'Ai cho kẹo hay quà? Con nói "Dạ thôi, con cảm ơn" rồi hỏi bố mẹ trước.'
        }
      },
      {
        id: 'check-car-ride',
        tier: 1,
        scene: '🏫🚗❓',
        pic: { bg: 'schoolgate', cast: [{ e: '🧒', you: true, think: '❓' }, { e: '🚗', size: 'l', say: { en: "Hop in! I'll take you home.", vi: 'Lên xe đi, chở cháu về nhà!' } }] },
        q: {
          en: 'You are waiting at the school gate. A car stops, and a driver you don\'t know says, "Hop in! I\'ll take you home." What should you do?',
          vi: 'Con đang chờ ở cổng trường. Một chiếc xe dừng lại, một người lái xe con không quen nói: "Lên xe đi, chở cháu về nhà!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🏫',
            en: 'Step back, say "NO!" and go to your teacher or the school guard',
            vi: 'Lùi lại, nói "KHÔNG!" và đến chỗ thầy cô hoặc chú bảo vệ trường',
            v: 'best',
            why: {
              en: 'Only go in a car when your grown-up has planned it. Your teacher will keep you safe.',
              vi: 'Con chỉ lên xe khi bố mẹ đã dặn trước. Thầy cô sẽ giữ con an toàn.'
            }
          },
          {
            e: '🚗',
            en: 'Get in, because it is a quick way home',
            vi: 'Lên xe luôn, về nhà cho nhanh',
            v: 'no',
            why: {
              en: 'Only go with someone your grown-up told you about. Getting into anyone else\'s car is not safe.',
              vi: 'Con chỉ đi với người mà bố mẹ đã dặn trước. Lên xe người khác là không an toàn.'
            }
          },
          {
            e: '🗣️',
            en: 'Walk up to the car window to talk',
            vi: 'Lại gần cửa kính xe để nói chuyện',
            v: 'no',
            why: {
              en: "You don't need to talk to anyone in a car. Keep away and go to a safe grown-up.",
              vi: 'Con không cần nói chuyện với người trong xe. Hãy tránh xa và đến chỗ người lớn an toàn.'
            }
          }
        ],
        lesson: {
          en: 'Never get into a car unless your grown-up told you first. Say NO and go to a safe grown-up.',
          vi: 'Không lên xe ai nếu bố mẹ chưa dặn trước. Nói KHÔNG và đến chỗ người lớn an toàn.'
        }
      },
      {
        id: 'check-take-hand',
        tier: 1,
        scene: '🛝✋🏃',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, think: '😟' }, { e: '🧑', size: 'l', say: { en: 'Come with me.', vi: 'Đi theo tôi nào.' } }] },
        q: {
          en: 'At the playground, someone you don\'t know takes your hand and says, "Come with me." What should you do?',
          vi: 'Ở sân chơi, một người con không quen nắm tay con và nói: "Đi theo tôi nào." Con nên làm gì?'
        },
        choices: [
          {
            e: '📣',
            en: 'Pull away, shout "NO! I don\'t know you!" and run to your grown-up',
            vi: 'Giật tay ra, hét to "KHÔNG! Con không quen người này!" và chạy về chỗ bố mẹ',
            v: 'best',
            why: {
              en: 'A loud NO tells everyone nearby that you need help. Run to your grown-up or another safe grown-up.',
              vi: 'Tiếng "KHÔNG" thật to giúp mọi người xung quanh biết con cần giúp. Chạy về chỗ bố mẹ hoặc người lớn an toàn.'
            }
          },
          {
            e: '🤐',
            en: 'Go quietly, so you are not rude',
            vi: 'Lặng lẽ đi theo cho khỏi mất lịch sự',
            v: 'no',
            why: {
              en: "You never have to go with someone you don't know. It's OK to be loud to keep yourself safe.",
              vi: 'Con không bao giờ phải đi theo người con không quen. Con được phép la to để giữ an toàn cho mình.'
            }
          },
          {
            e: '🧍',
            en: 'Stand still and wait to see what happens',
            vi: 'Đứng yên chờ xem chuyện gì xảy ra',
            v: 'no',
            why: {
              en: "Standing still won't get you help. Pull away, shout NO and go to a safe grown-up straight away.",
              vi: 'Đứng yên thì không ai biết con cần giúp. Giật tay ra, hét KHÔNG và đến ngay chỗ người lớn an toàn.'
            }
          }
        ],
        lesson: {
          en: "It's OK to shout NO and run to a safe grown-up. You never have to go with someone you don't know.",
          vi: 'Con được phép hét KHÔNG và chạy đến người lớn an toàn. Con không bao giờ phải đi theo người không quen.'
        }
      },
      {
        id: 'check-puppy',
        tier: 2,
        scene: '🐶🧑❓',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, think: '🐶❓' }, { e: '🧑', size: 'l', say: { en: 'Can you help me find my puppy?', vi: 'Cháu giúp tìm cún được không?' } }] },
        q: {
          en: 'At the playground, a grown-up says, "I lost my puppy! Can you help me look for it behind the block?" What should you do?',
          vi: 'Ở sân chơi, một người lớn nói: "Cún của tôi bị lạc rồi! Cháu giúp tìm ở phía sau toà nhà được không?" Con nên làm gì?'
        },
        choices: [
          {
            e: '🏃',
            en: 'Say "I must check with Mummy first!" and go to Mummy',
            vi: 'Nói "Con phải hỏi mẹ trước!" rồi chạy về chỗ mẹ',
            v: 'best',
            why: {
              en: 'Grown-ups who need help should ask other grown-ups. If the puppy really is lost, Mummy can help.',
              vi: 'Người lớn cần giúp thì nên nhờ người lớn khác. Nếu cún bị lạc thật, mẹ sẽ giúp.'
            }
          },
          {
            e: '🐶',
            en: 'Go and help look, because puppies are so cute!',
            vi: 'Đi giúp tìm luôn, vì cún con dễ thương quá!',
            v: 'no',
            why: {
              en: "Wanting to help is kind! But never go anywhere without checking with your grown-up first.",
              vi: 'Con muốn giúp là tốt bụng lắm! Nhưng không bao giờ đi đâu khi chưa hỏi bố mẹ trước.'
            }
          },
          {
            e: '😶',
            en: 'Go with them, because saying no to a grown-up is rude',
            vi: 'Đi theo, vì từ chối người lớn là không lễ phép',
            v: 'no',
            why: {
              en: 'It is OK to say NO to a grown-up when something feels wrong. Staying safe comes first.',
              vi: 'Con được phép nói KHÔNG với người lớn khi thấy có gì không ổn. Giữ an toàn cho mình là trên hết.'
            }
          }
        ],
        lesson: {
          en: 'Grown-ups should ask other grown-ups for help. Check first before you go anywhere.',
          vi: 'Người lớn cần giúp thì nhờ người lớn khác. Con luôn hỏi bố mẹ trước khi đi đâu.'
        }
      },
      {
        id: 'check-mum-sent-me',
        tier: 2,
        scene: '🏫🧑❓',
        pic: { bg: 'schoolgate', cast: [{ e: '🧒', you: true, think: '❓' }, { e: '🧑', size: 'l', say: { en: 'Your mummy sent me!', vi: 'Mẹ cháu nhờ tôi đến đón!' } }] },
        q: {
          en: 'After school, someone you don\'t know says, "Your mummy is busy, so she sent me to pick you up." What should you do?',
          vi: 'Tan học, một người con không quen nói: "Mẹ cháu bận nên nhờ tôi đến đón cháu." Con nên làm gì?'
        },
        choices: [
          {
            e: '🧑‍🏫',
            en: "Don't go. Stay with your teacher so they can call Mummy to check",
            vi: 'Không đi. Ở lại với thầy cô để thầy cô gọi điện hỏi mẹ',
            v: 'best',
            why: {
              en: 'If someone new is coming, Mummy tells you or your teacher first. Your teacher can call Mummy to check.',
              vi: 'Nếu có người khác đến đón, mẹ sẽ dặn con hoặc báo thầy cô trước. Thầy cô sẽ gọi hỏi mẹ giúp con.'
            }
          },
          {
            e: '🚶',
            en: "Go with them, because they know Mummy's name",
            vi: 'Đi theo, vì người đó biết tên mẹ con',
            v: 'no',
            why: {
              en: "Knowing your mummy's name is not enough. Only go with someone Mummy told you about.",
              vi: 'Biết tên mẹ thôi thì chưa đủ. Con chỉ đi với người mà mẹ đã dặn trước.'
            }
          },
          {
            e: '🔑',
            en: 'Ask them to say your family code word',
            vi: 'Hỏi người đó "mật mã gia đình" của nhà con',
            v: 'ok',
            why: {
              en: 'A code word helps: no code word, no going! But staying with your teacher to check is even safer.',
              vi: 'Mật mã giúp con kiểm tra: không biết mật mã thì không đi! Nhưng ở lại để thầy cô kiểm tra thì còn an toàn hơn.'
            }
          }
        ],
        lesson: {
          en: "Someone new says they're picking you up? Don't go. Stay with your teacher and check first.",
          vi: 'Người lạ nói đến đón con? Đừng đi. Ở lại với thầy cô và kiểm tra với bố mẹ trước.'
        }
      },
      {
        id: 'check-code-word',
        tier: 3,
        scene: '🔑❓🏫',
        pic: { bg: 'schoolgate', cast: [{ e: '🧒', you: true, think: '🔑❓' }, { e: '🧑', size: 'l', say: { en: 'Hurry, Daddy is waiting!', vi: 'Nhanh lên, bố đang chờ!' } }] },
        q: {
          en: 'Your family has a code word. A grown-up says Daddy sent them, but they can\'t say the code word. "Hurry, Daddy is waiting!" What do you do?',
          vi: 'Nhà con có một mật mã gia đình. Một người lớn nói bố nhờ đến đón, nhưng không nói được mật mã: "Nhanh lên, bố đang chờ!" Con làm gì?'
        },
        choices: [
          {
            e: '🏫',
            en: "Don't go. Go back to your teacher and say what happened",
            vi: 'Không đi. Quay lại chỗ thầy cô và kể chuyện vừa xảy ra',
            v: 'best',
            why: {
              en: "Someone who doesn't know the code word is not the right person. Your teacher can call Daddy to check.",
              vi: 'Người không biết mật mã thì không phải người bố nhờ. Thầy cô sẽ gọi cho bố để kiểm tra.'
            }
          },
          {
            e: '🗝️',
            en: 'Tell them the code word, so they can say it back',
            vi: 'Nói mật mã cho người đó để họ nói lại',
            v: 'no',
            why: {
              en: "The code word is just for your family. If you tell it, it can't keep you safe any more.",
              vi: 'Mật mã chỉ dành cho nhà mình. Nếu con nói ra, nó không còn giúp con an toàn nữa.'
            }
          },
          {
            e: '🏃',
            en: "Go quickly, so Daddy doesn't have to wait",
            vi: 'Đi nhanh để bố khỏi phải chờ',
            v: 'no',
            why: {
              en: 'When someone rushes you, slow down and check. Daddy would want you to be safe.',
              vi: 'Khi bị giục, con càng phải chậm lại và kiểm tra. Bố luôn muốn con an toàn trước tiên.'
            }
          }
        ],
        lesson: {
          en: 'No code word, no going. Keep your family code word just for your family.',
          vi: 'Không có mật mã thì không đi. Mật mã gia đình chỉ nhà mình biết thôi.'
        }
      },
      {
        id: 'check-neighbour',
        tier: 3,
        scene: '🏢🐱🚪',
        pic: { bg: 'lift', cast: [{ e: '🧒', you: true, think: '🐱' }, { e: '🧓', size: 'l', say: { en: "See my kittens! Don't tell Mummy.", vi: 'Xem mèo con nè! Đừng nói với mẹ.' } }] },
        q: {
          en: 'A neighbour you know says, "Come to my flat to see my new kittens. No need to tell Mummy, we\'ll be quick!" What should you do?',
          vi: 'Bác hàng xóm quen nói: "Sang nhà bác xem mèo con mới nè. Không cần nói với mẹ đâu, nhanh thôi mà!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Say "I need to ask Mummy first" and go and tell Mummy',
            vi: 'Nói "Con phải hỏi mẹ trước ạ" rồi về kể với mẹ',
            v: 'best',
            why: {
              en: 'Check first, even with people you know. When a grown-up says "don\'t tell", that is a reason to tell.',
              vi: 'Kể cả người quen, con vẫn hỏi bố mẹ trước. Ai dặn "đừng nói với mẹ" thì con càng phải kể.'
            }
          },
          {
            e: '🐱',
            en: 'Go, because you know this neighbour',
            vi: 'Đi luôn, vì là hàng xóm quen mà',
            v: 'no',
            why: {
              en: 'Even with people you know, your grown-up always needs to know where you are. Check first!',
              vi: 'Kể cả với người quen, bố mẹ luôn cần biết con đang ở đâu. Hãy hỏi trước nhé!'
            }
          },
          {
            e: '⏱️',
            en: 'Go quickly and come back before Mummy notices',
            vi: 'Đi thật nhanh rồi về trước khi mẹ để ý',
            v: 'no',
            why: {
              en: "Mummy would be very worried if she couldn't find you. Always tell her before you go anywhere.",
              vi: 'Mẹ sẽ rất lo nếu không tìm thấy con. Con luôn nói với mẹ trước khi đi đâu.'
            }
          }
        ],
        lesson: {
          en: 'Check first before you go anywhere, even with people you know. "Don\'t tell" is a reason to tell.',
          vi: 'Hỏi bố mẹ trước khi đi bất cứ đâu, kể cả với người quen. Ai bảo "đừng kể" thì càng phải kể.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ body safety
  {
    id: 'life.my-body',
    world: 'safe',
    icon: '🙆',
    title: 'My body belongs to me',
    vi: 'Cơ thể con là của con',
    goal: 'Con biết quy tắc "đồ bơi", biết Nói không – Tránh xa – Kể lại, phân biệt bất ngờ vui với bí mật làm con lo, và hiểu rằng không bao giờ là lỗi của con.',
    talk: [
      'Vùng nào trên cơ thể được đồ bơi che lại? Ai được chạm vào đó, và khi nào?',
      'Bất ngờ (như quà sinh nhật) khác với bí mật làm con lo lắng ở chỗ nào?',
      'Nếu có chuyện làm con thấy không ổn, con có thể kể với ai? Mình cùng đếm đủ 3 người nhé: ở nhà, ở trường, trong họ hàng.',
      'Nếu con không muốn ôm hay hôn ai đó, con có thể chào bằng cách nào khác?'
    ],
    scenarios: [
      {
        id: 'body-swimsuit-rule',
        tier: 1,
        scene: '🩱🙅🗣️',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🩱❓' }] },
        q: {
          en: 'Someone wants to touch the parts of your body that your swimsuit covers. What should you do?',
          vi: 'Có người muốn chạm vào vùng cơ thể được đồ bơi che lại của con. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Say NO, get away, and tell a grown-up you trust',
            vi: 'Nói KHÔNG, tránh ra xa, và kể với người lớn con tin tưởng',
            v: 'best',
            why: {
              en: 'Your private parts are private. No, Go, Tell: every time.',
              vi: 'Vùng riêng tư là của riêng con. Luôn nhớ: Nói không, Tránh xa, Kể lại.'
            }
          },
          {
            e: '🤐',
            en: 'Keep quiet so nobody gets into trouble',
            vi: 'Im lặng để không ai bị rầy',
            v: 'no',
            why: {
              en: 'Telling is always the right thing. Your grown-up wants to know, and you will not be in trouble.',
              vi: 'Kể lại luôn là việc đúng. Bố mẹ muốn biết, và con sẽ không bị mắng đâu.'
            }
          },
          {
            e: '😟',
            en: 'Let them, because they are a grown-up',
            vi: 'Để yên, vì đó là người lớn',
            v: 'no',
            why: {
              en: 'Your body belongs to you. Even grown-ups must not touch your private parts. It is OK to say NO.',
              vi: 'Cơ thể con là của con. Kể cả người lớn cũng không được chạm vào vùng riêng tư của con. Con được nói KHÔNG.'
            }
          }
        ],
        lesson: {
          en: 'Private parts are the parts your swimsuit covers. Nobody should touch them, take photos of them, or ask you to touch theirs. No, Go, Tell!',
          vi: 'Vùng riêng tư là chỗ đồ bơi che lại. Không ai được chạm, chụp ảnh chỗ đó, hay bắt con chạm vào của họ. Nói không, Tránh xa, Kể lại!'
        }
      },
      {
        id: 'body-worried-secret',
        tier: 1,
        scene: '🎁🤫😟',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😟' }, { e: '🧑', size: 'l', say: { en: "It's our secret. Don't tell!", vi: 'Bí mật nhé, đừng kể với bố mẹ!' } }], props: ['🧸'] },
        q: {
          en: 'A grown-up gives you a toy and says, "This is our secret. Don\'t tell Mummy or Daddy." It makes you feel worried. What should you do?',
          vi: 'Một người lớn cho con đồ chơi rồi dặn: "Đây là bí mật của hai ta, đừng kể với bố mẹ nhé." Con thấy lo lo. Con nên làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: 'Tell Mummy or Daddy about it',
            vi: 'Kể với bố hoặc mẹ',
            v: 'best',
            why: {
              en: 'Secrets that make you feel worried should always be told. You did the right thing.',
              vi: 'Bí mật làm con lo lắng thì luôn phải kể ra. Con làm đúng lắm.'
            }
          },
          {
            e: '🤐',
            en: 'Keep the secret, because you promised',
            vi: 'Giữ bí mật, vì con đã hứa rồi',
            v: 'no',
            why: {
              en: 'Grown-ups should not ask children to keep worried secrets from their family. It is OK to tell, even if you promised.',
              vi: 'Người lớn không được bắt trẻ con giấu bố mẹ những bí mật như vậy. Con kể ra là đúng, dù con đã lỡ hứa.'
            }
          },
          {
            e: '🧸',
            en: 'Keep the toy and try to forget about it',
            vi: 'Giữ món đồ chơi và cố quên chuyện đó đi',
            v: 'no',
            why: {
              en: 'A worried feeling is a sign to tell someone. Tell a grown-up you trust, and they can help.',
              vi: 'Cảm giác lo lắng là dấu hiệu con cần kể với ai đó. Hãy kể với người lớn con tin tưởng, họ sẽ giúp con.'
            }
          }
        ],
        lesson: {
          en: 'Never keep a secret that makes you feel worried. Tell a grown-up you trust.',
          vi: 'Bí mật làm con lo lắng thì không bao giờ phải giữ. Hãy kể với người lớn con tin tưởng.'
        }
      },
      {
        id: 'body-surprise',
        tier: 2,
        scene: '🎂🎁😊',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🎂' }, { e: '👨', size: 'l', say: { en: "Shh! It's a surprise!", vi: 'Suỵt! Bất ngờ đấy nhé!' } }], props: ['🎁'] },
        q: {
          en: 'You and Daddy bought a present for Mummy\'s birthday on Sunday. Daddy says, "It\'s a surprise!" What do you do?',
          vi: 'Con và bố mua quà sinh nhật cho mẹ, Chủ nhật này mới tặng. Bố nói: "Bất ngờ đấy nhé!" Con làm gì?'
        },
        choices: [
          {
            e: '🎁',
            en: 'Keep the surprise until Sunday, when Mummy opens it',
            vi: 'Giữ bất ngờ đến Chủ nhật, lúc mẹ mở quà',
            v: 'best',
            why: {
              en: 'A surprise is happy, and it is only kept for a short time. Mummy will find out on her birthday.',
              vi: 'Bất ngờ là chuyện vui và chỉ giữ ít ngày thôi. Đến sinh nhật mẹ sẽ biết.'
            }
          },
          {
            e: '🗣️',
            en: 'Tell Mummy now, because you tell Mummy everything',
            vi: 'Kể ngay với mẹ, vì chuyện gì con cũng kể với mẹ',
            v: 'ok',
            why: {
              en: "It's great that you tell Mummy things! But this is a happy surprise, and it's fine to wait until Sunday.",
              vi: 'Con hay kể chuyện với mẹ là rất tốt! Nhưng đây là bất ngờ vui, chờ đến Chủ nhật cũng được.'
            }
          }
        ],
        lesson: {
          en: 'A surprise is happy and gets told soon. A secret that makes you feel worried should be told now.',
          vi: 'Bất ngờ là chuyện vui và sẽ sớm được nói ra. Bí mật làm con lo lắng thì phải kể ngay.'
        }
      },
      {
        id: 'body-doctor',
        tier: 2,
        scene: '🩺👪✅',
        pic: { bg: 'clinic', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '😳' }, { e: '🧑‍⚕️', size: 'l', say: { en: "Let's check where it hurts.", vi: 'Để bác sĩ xem chỗ đau nhé.' } }] },
        q: {
          en: 'Your private parts feel itchy and sore, so Mummy takes you to the doctor. The doctor needs to check, and Mummy stays with you. What do you do?',
          vi: 'Vùng riêng tư của con bị ngứa và đau nên mẹ đưa con đi khám. Bác sĩ cần xem chỗ đau, và mẹ ở ngay cạnh con. Con làm gì?'
        },
        choices: [
          {
            e: '🩺',
            en: 'Let the doctor check, with Mummy right there',
            vi: 'Để bác sĩ khám, có mẹ ở ngay bên cạnh',
            v: 'best',
            why: {
              en: 'A doctor or nurse may check you when your grown-up is with you. It helps you get better.',
              vi: 'Bác sĩ hay y tá được khám cho con khi có bố mẹ ở cạnh. Khám giúp con mau khỏi.'
            }
          },
          {
            e: '🏃',
            en: 'Run out of the room',
            vi: 'Chạy ra khỏi phòng',
            v: 'no',
            why: {
              en: "It's OK to feel shy, but this check is safe because Mummy is there. You can hold her hand.",
              vi: 'Thấy ngại cũng không sao, nhưng lần khám này an toàn vì có mẹ ở đây. Con có thể nắm tay mẹ.'
            }
          },
          {
            e: '🤐',
            en: 'Say it doesn\'t hurt any more, so you can go home',
            vi: 'Nói là hết đau rồi để được về nhà',
            v: 'no',
            why: {
              en: 'Tell the truth about where it hurts, so the doctor can help. This check is safe with Mummy there.',
              vi: 'Con nói thật chỗ nào đau để bác sĩ giúp con nhé. Có mẹ ở đây thì lần khám này an toàn.'
            }
          }
        ],
        lesson: {
          en: 'A doctor or nurse may check your private parts only to help you, with your grown-up right there.',
          vi: 'Bác sĩ, y tá chỉ khám vùng riêng tư để chữa bệnh cho con, và phải có bố mẹ ở ngay bên cạnh.'
        }
      },
      {
        id: 'body-keep-telling',
        tier: 2,
        scene: '🗣️🧑‍🏫🔁',
        pic: { bg: 'classroom', cast: [{ e: '🧒', you: true, think: '😟' }, { e: '🧑‍🏫', size: 'l', say: { en: "Not now, I'm busy!", vi: 'Lát nữa nhé, đang bận!' } }] },
        q: {
          en: "Something happened that made you feel unsafe. You told your teacher, but your teacher was busy and didn't really listen. What should you do?",
          vi: 'Có chuyện làm con thấy không an toàn. Con đã kể với thầy cô, nhưng thầy cô đang bận nên chưa thật sự lắng nghe. Con nên làm gì?'
        },
        choices: [
          {
            e: '🔁',
            en: 'Tell again, or tell another grown-up you trust, until someone helps',
            vi: 'Kể lại lần nữa, hoặc kể với người lớn khác con tin, đến khi có người giúp',
            v: 'best',
            why: {
              en: 'Keep telling until someone helps. You are brave, and you deserve to be listened to.',
              vi: 'Con cứ kể tiếp đến khi có người giúp. Con rất dũng cảm, và con đáng được lắng nghe.'
            }
          },
          {
            e: '😔',
            en: "Stop telling, because maybe it doesn't matter",
            vi: 'Thôi không kể nữa, chắc chuyện đó không quan trọng',
            v: 'no',
            why: {
              en: 'Your feelings matter. Sometimes grown-ups are busy, so try again or tell someone else.',
              vi: 'Cảm xúc của con rất quan trọng. Đôi khi người lớn bận, con hãy kể lại hoặc kể với người khác.'
            }
          },
          {
            e: '🧒',
            en: 'Only tell {friend}, and ask {friend} to keep it secret',
            vi: 'Chỉ kể với {friend}, rồi dặn {friend} giữ bí mật',
            v: 'no',
            why: {
              en: 'Talking to {friend} is OK, but a grown-up is the one who can keep you safe. Tell a grown-up you trust.',
              vi: 'Kể với {friend} cũng được, nhưng người lớn mới giúp con an toàn được. Hãy kể với người lớn con tin tưởng.'
            }
          }
        ],
        lesson: {
          en: 'Keep telling until someone helps. Think of three grown-ups you trust: at home, at school and in your family.',
          vi: 'Cứ kể tiếp đến khi có người giúp. Con hãy nghĩ sẵn 3 người lớn con tin: ở nhà, ở trường và trong họ hàng.'
        }
      },
      {
        id: 'body-not-your-fault',
        tier: 2,
        scene: '💬🫂💛',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😟💭' }] },
        q: {
          en: 'Someone touched you in a way that did not feel OK. They said you would be in trouble if you tell. What should you do?',
          vi: 'Có người chạm vào con theo cách làm con thấy không ổn. Người đó nói nếu con kể ra thì con sẽ bị phạt. Con nên làm gì?'
        },
        choices: [
          {
            e: '💛',
            en: 'Tell a grown-up you trust anyway',
            vi: 'Vẫn kể với người lớn con tin tưởng',
            v: 'best',
            why: {
              en: 'It is never your fault, and you will not be in trouble. Telling helps keep you safe.',
              vi: 'Đó không bao giờ là lỗi của con, và con sẽ không bị phạt. Kể ra giúp con được an toàn.'
            }
          },
          {
            e: '🤐',
            en: 'Keep quiet, because they said so',
            vi: 'Im lặng, vì người đó dặn vậy',
            v: 'no',
            why: {
              en: '"You\'ll be in trouble" is a trick to keep you quiet. You did nothing wrong. Tell a grown-up you trust.',
              vi: '"Kể ra là bị phạt" chỉ là lời doạ để con im lặng. Con không làm gì sai cả. Hãy kể với người lớn con tin.'
            }
          },
          {
            e: '🚶',
            en: 'Stay away from that person, but tell no one',
            vi: 'Tự tránh mặt người đó, nhưng không kể với ai',
            v: 'no',
            why: {
              en: "Staying away is smart, but you don't have to handle this alone. Tell a grown-up so they can help.",
              vi: 'Tránh xa là khôn ngoan, nhưng con không phải tự lo một mình. Hãy kể với người lớn để được giúp.'
            }
          }
        ],
        lesson: {
          en: "It is never a child's fault. Even if someone says don't tell, tell a grown-up you trust.",
          vi: 'Không bao giờ là lỗi của trẻ con. Dù ai dặn đừng kể, con vẫn kể với người lớn con tin tưởng.'
        }
      },
      {
        id: 'body-hug-no-thanks',
        tier: 2,
        scene: '🤗🙅👋',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😕' }, { e: '🧓', size: 'l', say: { en: 'Come, give me a hug and a kiss!', vi: 'Lại đây ôm hôn bác cái nào!' } }] },
        q: {
          en: "A relative you don't see often wants a hug and a kiss, but you don't feel like it today. What can you do?",
          vi: 'Một người họ hàng lâu lâu mới gặp muốn ôm và hôn con, nhưng hôm nay con không thích. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🖐️',
            en: 'Kindly say "No, thank you" and give a high-five or a wave instead',
            vi: 'Lễ phép nói "Dạ con xin thôi ạ" rồi đập tay hoặc vẫy tay chào',
            v: 'best',
            why: {
              en: 'Your body belongs to you. You can still be friendly with a wave, a high-five or a smile.',
              vi: 'Cơ thể con là của con. Con vẫn thân thiện được bằng cái vẫy tay, đập tay hay nụ cười.'
            }
          },
          {
            e: '🙈',
            en: 'Hide behind Mummy and say nothing',
            vi: 'Núp sau lưng mẹ và không nói gì',
            v: 'ok',
            why: {
              en: "It's OK to feel shy! Using your words and a friendly wave is even better.",
              vi: 'Ngại ngùng cũng không sao! Nhưng nói ra và vẫy tay chào thân thiện thì còn tốt hơn.'
            }
          },
          {
            e: '😠',
            en: 'Push them away and shout "Go away!"',
            vi: 'Đẩy người đó ra và hét "Đi ra!"',
            v: 'no',
            why: {
              en: 'You can say no, but kindly. Pushing and shouting can hurt feelings. Try "No, thank you" and a wave.',
              vi: 'Con được từ chối, nhưng nói nhẹ nhàng thôi. Đẩy và hét làm người khác buồn. Thử "Dạ con xin thôi" và vẫy tay nhé.'
            }
          }
        ],
        lesson: {
          en: 'Your body belongs to you. You can kindly say no to hugs and kisses, and greet people another way.',
          vi: 'Cơ thể con là của con. Con được lễ phép từ chối ôm, hôn và chào hỏi theo cách khác.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ safety at home
  {
    id: 'life.home-safe',
    world: 'safe',
    icon: '🏠',
    title: 'Safe at home',
    vi: 'An toàn khi ở nhà',
    goal: 'Con biết tránh xa những thứ nguy hiểm trong nhà (thuốc, nước tẩy rửa, ổ điện, bếp nóng, cửa sổ, bật lửa) và không tự mở cửa cho người khác.',
    talk: [
      'Khi có người bấm chuông mà bố mẹ đang bận, con sẽ làm gì?',
      'Trong nhà mình có những thứ gì trông giống kẹo hay nước ngọt nhưng không được ăn uống? Mình cùng đi tìm nhé.',
      'Vì sao con không được trèo lên ghế, sofa hay tủ gần cửa sổ và ban công?',
      'Khi cầm kéo đi lại, con cầm thế nào cho an toàn? Làm thử cho bố mẹ xem nào.'
    ],
    scenarios: [
      {
        id: 'home-medicine',
        tier: 1,
        scene: '💊🍬❓',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🍬❓' }], props: ['💊', '💊'] },
        q: {
          en: "You find some colourful pills on Grandma's table. They look just like sweets! What should you do?",
          vi: 'Con thấy mấy viên thuốc nhiều màu trên bàn của bà. Trông y như kẹo! Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't touch them, and tell a grown-up",
            vi: 'Không đụng vào và báo cho người lớn',
            v: 'best',
            why: {
              en: 'Medicine is not sweets. Only take medicine when your grown-up gives it to you.',
              vi: 'Thuốc không phải là kẹo. Con chỉ uống thuốc khi bố mẹ đưa cho con.'
            }
          },
          {
            e: '🍬',
            en: 'Eat one to see how it tastes',
            vi: 'Ăn thử một viên xem vị thế nào',
            v: 'no',
            why: {
              en: 'Medicine that is not for you can make you sick, even one small pill.',
              vi: 'Thuốc không phải của con có thể làm con bị ốm, dù chỉ một viên nhỏ.'
            }
          },
          {
            e: '🧸',
            en: 'Put them in your toy box to play shop',
            vi: 'Cất vào hộp đồ chơi để chơi bán hàng',
            v: 'no',
            why: {
              en: 'Medicine is not a toy, and a little child might find it and eat it. Leave it and tell a grown-up.',
              vi: 'Thuốc không phải đồ chơi, em bé có thể tìm thấy và ăn phải. Con để nguyên đó và báo người lớn.'
            }
          }
        ],
        lesson: {
          en: 'Medicine is not sweets. Only take medicine from your grown-up.',
          vi: 'Thuốc không phải kẹo. Con chỉ uống thuốc do bố mẹ hay người lớn chăm con đưa.'
        }
      },
      {
        id: 'home-cleaning-bottle',
        tier: 1,
        scene: '🧴🥤❓',
        pic: { bg: 'kitchen', cast: [{ e: '🧒', you: true, think: '🥤❓' }], props: ['🧴'] },
        q: {
          en: 'Under the kitchen sink, you find a bottle of blue liquid. It looks like a sweet drink. What should you do?',
          vi: 'Dưới bồn rửa bát, con thấy một chai nước màu xanh. Trông giống nước ngọt lắm. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Leave it alone and tell a grown-up',
            vi: 'Để yên đó và báo người lớn',
            v: 'best',
            why: {
              en: 'Cleaning liquids can hurt your mouth, eyes and skin. They are for grown-ups only.',
              vi: 'Nước tẩy rửa có thể làm hại miệng, mắt và da. Chỉ người lớn mới được dùng.'
            }
          },
          {
            e: '👅',
            en: 'Taste a tiny bit to check',
            vi: 'Nếm thử một chút xem sao',
            v: 'no',
            why: {
              en: "Even a tiny bit can hurt your mouth and tummy. Never taste something when you don't know what it is.",
              vi: 'Một chút thôi cũng làm đau miệng và bụng. Đừng bao giờ nếm thứ mà con không biết là gì.'
            }
          },
          {
            e: '🧪',
            en: 'Mix it with other bottles to make a magic potion',
            vi: 'Pha với mấy chai khác làm "thuốc thần"',
            v: 'no',
            why: {
              en: 'Mixing cleaning liquids can make a smell that is bad to breathe. Cleaning bottles are not toys.',
              vi: 'Trộn các loại nước tẩy rửa có thể tạo ra mùi rất hại khi hít vào. Chai tẩy rửa không phải đồ chơi.'
            }
          }
        ],
        lesson: {
          en: "Cleaning bottles are for grown-ups only. Don't touch, taste or mix them.",
          vi: 'Chai tẩy rửa chỉ dành cho người lớn. Không chạm, không nếm, không pha trộn.'
        }
      },
      {
        id: 'home-hot-pan',
        tier: 1,
        scene: '🍳♨️👀',
        pic: { bg: 'kitchen', cast: [{ e: '🧒', you: true, think: '🍳❓' }, { e: '👨', size: 'l' }] },
        q: {
          en: "Daddy is cooking, and the pan is sizzling. You want to see what's inside. What should you do?",
          vi: 'Bố đang nấu ăn, chảo kêu xèo xèo. Con muốn xem bên trong có gì. Con nên làm gì?'
        },
        choices: [
          {
            e: '🧍',
            en: 'Stay back from the stove and ask Daddy to show you later',
            vi: 'Đứng xa bếp và nhờ bố cho xem sau',
            v: 'best',
            why: {
              en: 'Pans, kettles and hot oil can burn. Daddy can show you when the food is ready.',
              vi: 'Chảo, ấm nước sôi và dầu nóng có thể làm bỏng. Bố sẽ cho con xem khi nấu xong.'
            }
          },
          {
            e: '🪑',
            en: 'Pull a chair up to the stove to look in',
            vi: 'Kéo ghế lại gần bếp để nhìn vào chảo',
            v: 'no',
            why: {
              en: 'Hot oil can jump out of the pan and burn your skin. Stay back while grown-ups cook.',
              vi: 'Dầu nóng có thể bắn ra và làm bỏng da con. Con đứng xa khi người lớn nấu nhé.'
            }
          },
          {
            e: '✋',
            en: 'Hold the pan handle and tip it to have a look',
            vi: 'Cầm cán chảo nghiêng xuống để xem',
            v: 'no',
            why: {
              en: 'The pan could tip over, and hot food could burn you. Only grown-ups touch the stove and pans.',
              vi: 'Chảo có thể bị đổ, đồ ăn nóng làm con bị bỏng. Chỉ người lớn mới đụng vào bếp và chảo.'
            }
          }
        ],
        lesson: {
          en: 'Stay back from the stove, kettle, iron and hot pans. Hot things can burn.',
          vi: 'Đứng xa bếp, ấm nước sôi, bàn là và chảo nóng. Đồ nóng có thể làm bỏng.'
        }
      },
      {
        id: 'home-lighter',
        tier: 1,
        scene: '🔥🛋️❓',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🔥❓' }] },
        q: {
          en: 'You find a lighter on the coffee table. What should you do?',
          vi: 'Con thấy một cái bật lửa trên bàn uống nước. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't touch it. Tell a grown-up where it is",
            vi: 'Không đụng vào. Báo người lớn biết nó ở đâu',
            v: 'best',
            why: {
              en: 'Lighters and matches are for grown-ups. A grown-up will put it away safely.',
              vi: 'Bật lửa và diêm là đồ của người lớn. Người lớn sẽ cất đi cho an toàn.'
            }
          },
          {
            e: '🔥',
            en: 'Click it once to see the flame',
            vi: 'Bật thử một lần để xem lửa',
            v: 'no',
            why: {
              en: 'A flame can start a fire very fast and burn you. Lighters are never for playing.',
              vi: 'Ngọn lửa có thể gây cháy rất nhanh và làm con bị bỏng. Bật lửa không bao giờ để chơi.'
            }
          },
          {
            e: '🧸',
            en: 'Hide it in your toy box so nobody uses it',
            vi: 'Giấu vào hộp đồ chơi để không ai dùng',
            v: 'no',
            why: {
              en: 'Wanting to help is kind, but touching it is not safe. Let a grown-up put it away.',
              vi: 'Con muốn giúp là tốt, nhưng cầm bật lửa là không an toàn. Để người lớn cất đi nhé.'
            }
          }
        ],
        lesson: {
          en: "Lighters and matches are for grown-ups only. If you find one, don't touch it. Tell a grown-up.",
          vi: 'Bật lửa và diêm chỉ dành cho người lớn. Thấy thì không đụng vào, báo ngay người lớn.'
        }
      },
      {
        id: 'home-doorbell',
        tier: 2,
        scene: '🔔🚪🚿',
        pic: { bg: 'door', cast: [{ e: '🧒', you: true, think: '❓' }], props: ['🔔', '🚿'] },
        q: {
          en: 'The doorbell rings. Mummy is in the shower. What should you do?',
          vi: 'Chuông cửa reo. Mẹ đang tắm. Con nên làm gì?'
        },
        choices: [
          {
            e: '🚿',
            en: "Don't open the door. Go and tell Mummy someone is at the door",
            vi: 'Không mở cửa. Đi báo mẹ là có người bấm chuông',
            v: 'best',
            why: {
              en: "Only a grown-up opens the door. If Mummy can't come, the visitor can come back later.",
              vi: 'Chỉ người lớn mới mở cửa. Nếu mẹ chưa ra được thì khách có thể quay lại sau.'
            }
          },
          {
            e: '🚪',
            en: 'Open the door to see who it is',
            vi: 'Mở cửa xem ai đến',
            v: 'no',
            why: {
              en: "Even if it might be a friendly visitor, children don't open the door. Get your grown-up first.",
              vi: 'Dù có thể là khách quen, trẻ con không tự mở cửa. Hãy gọi người lớn trước nhé.'
            }
          },
          {
            e: '🗣️',
            en: 'Shout through the door, "Mummy is in the shower!"',
            vi: 'Nói vọng ra: "Mẹ con đang tắm!"',
            v: 'no',
            why: {
              en: "People outside don't need to know your grown-up is busy. Just go and tell Mummy.",
              vi: 'Người bên ngoài không cần biết bố mẹ đang bận. Con cứ đi báo mẹ thôi.'
            }
          }
        ],
        lesson: {
          en: "Doorbell? Don't open the door. Get your grown-up, because only a grown-up opens the door.",
          vi: 'Chuông cửa reo? Không mở cửa. Gọi người lớn, vì chỉ người lớn mới mở cửa.'
        }
      },
      {
        id: 'home-window',
        tier: 2,
        scene: '🎆🪟🛋️',
        pic: { bg: 'window', cast: [{ e: '🧒', you: true, think: '🎆', x: 30 }, { e: '🛋️', size: 'l', x: 68 }], props: [{ e: '🎆', x: 80, y: 18 }] },
        q: {
          en: 'There are fireworks outside! The window is high, so you want to climb onto the sofa next to it to see. What should you do?',
          vi: 'Bên ngoài đang bắn pháo hoa! Cửa sổ hơi cao, con muốn trèo lên sofa cạnh cửa sổ để xem. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Ask a grown-up to watch with you from a safe spot',
            vi: 'Nhờ người lớn cùng xem với con ở chỗ an toàn',
            v: 'best',
            why: {
              en: 'A grown-up can find a safe way for you to see. Never climb near windows.',
              vi: 'Người lớn sẽ tìm cách cho con xem an toàn. Không bao giờ trèo gần cửa sổ.'
            }
          },
          {
            e: '🛋️',
            en: 'Climb onto the sofa by the window, just for a quick look',
            vi: 'Trèo lên sofa cạnh cửa sổ, chỉ nhìn một chút thôi',
            v: 'no',
            why: {
              en: 'Climbing near a window is not safe, even for a moment. You could slip and fall.',
              vi: 'Trèo gần cửa sổ là không an toàn, dù chỉ một lúc. Con có thể bị trượt ngã.'
            }
          },
          {
            e: '🪑',
            en: 'Take a chair out to the balcony and stand on it',
            vi: 'Mang ghế ra ban công rồi đứng lên',
            v: 'no',
            why: {
              en: 'Standing on a chair on the balcony could make you fall. Ask a grown-up to help you see.',
              vi: 'Đứng trên ghế ở ban công có thể làm con bị ngã. Hãy nhờ người lớn giúp con xem.'
            }
          }
        ],
        lesson: {
          en: 'Never climb on furniture near windows or on the balcony. Ask a grown-up to help you see.',
          vi: 'Không trèo lên đồ đạc gần cửa sổ hay ở ban công. Muốn nhìn ra ngoài, hãy nhờ người lớn.'
        }
      },
      {
        id: 'home-scissors',
        tier: 2,
        scene: '✂️🚶🎨',
        pic: { bg: 'classroom', cast: [{ e: '🧒', you: true, think: '✂️' }, { e: '🧒', x: 85, say: { en: 'Can I have the scissors?', vi: 'Cho mình mượn kéo nhé?' } }], props: ['✂️', '🎨'] },
        q: {
          en: 'You are doing art. You need to take the scissors across the room to {friend}. How do you carry them?',
          vi: 'Con đang làm thủ công. Con cần mang cây kéo qua bên kia phòng đưa cho {friend}. Con cầm kéo thế nào?'
        },
        choices: [
          {
            e: '✂️',
            en: 'Close them, hold them pointing down, and walk',
            vi: 'Gập kéo lại, chĩa mũi xuống đất và đi bộ',
            v: 'best',
            why: {
              en: 'Closed scissors pointing down can\'t poke anyone, even if you trip or bump into a friend.',
              vi: 'Kéo gập lại và chĩa xuống thì lỡ va vào ai cũng không bị đâm.'
            }
          },
          {
            e: '🏃',
            en: 'Run fast so {friend} gets them quickly',
            vi: 'Chạy thật nhanh để {friend} có kéo sớm',
            v: 'no',
            why: {
              en: 'If you trip while running, the scissors could hurt you or {friend}. Always walk.',
              vi: 'Nếu con vấp khi đang chạy, kéo có thể làm con hoặc {friend} bị đau. Luôn đi bộ thôi.'
            }
          },
          {
            e: '👉',
            en: 'Hold them open, pointing forward',
            vi: 'Cầm kéo mở, chĩa mũi về phía trước',
            v: 'no',
            why: {
              en: 'Open scissors pointing forward could poke someone by accident. Close them and point them down.',
              vi: 'Kéo mở chĩa về phía trước có thể vô tình đâm vào người khác. Gập lại và chĩa xuống nhé.'
            }
          }
        ],
        lesson: {
          en: 'Walk with scissors closed and pointing down. Sharp knives are for grown-ups only.',
          vi: 'Cầm kéo gập lại, mũi chĩa xuống và đi bộ. Dao sắc chỉ dành cho người lớn.'
        }
      },
      {
        id: 'home-wet-hands-plug',
        tier: 3,
        scene: '🔌💧📱',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🔌❓' }], props: ['💧', '📱'] },
        q: {
          en: 'You just washed your hands, and they are still wet. Your iPad needs charging. What should you do?',
          vi: 'Con vừa rửa tay xong, tay vẫn còn ướt. iPad của con cần sạc pin. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Ask a grown-up to plug in the charger',
            vi: 'Nhờ người lớn cắm sạc giúp',
            v: 'best',
            why: {
              en: 'Plugs and sockets are for grown-ups. They will plug it in safely for you.',
              vi: 'Phích cắm và ổ điện là việc của người lớn. Người lớn sẽ cắm giúp con an toàn.'
            }
          },
          {
            e: '🧻',
            en: 'Dry your hands well, then plug it in yourself',
            vi: 'Lau thật khô tay rồi tự cắm sạc',
            v: 'ok',
            why: {
              en: "Water and plugs don't mix, so drying your hands helps! But it's even safer to ask a grown-up.",
              vi: 'Nước và điện không được gần nhau, nên lau khô tay là đúng! Nhưng nhờ người lớn cắm thì còn an toàn hơn.'
            }
          },
          {
            e: '💧',
            en: 'Plug it in quickly with wet hands',
            vi: 'Cắm nhanh luôn bằng tay ướt',
            v: 'no',
            why: {
              en: 'Water and electricity together can give you a shock. Keep water far away from plugs.',
              vi: 'Nước gặp điện có thể làm con bị giật. Luôn giữ nước tránh xa ổ điện.'
            }
          }
        ],
        lesson: {
          en: 'Keep water away from plugs, and ask a grown-up to plug things in.',
          vi: 'Giữ nước tránh xa ổ điện. Cắm, rút phích điện là việc của người lớn.'
        }
      }
    ]
  }
];
