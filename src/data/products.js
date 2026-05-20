export const productsData = [
  { 
    id: 1, 
    name: 'Vestido Helena Marfim', 
    price: 289.90, 
    category: 'FEMININO', 
    type: 'VESTIDOS', 
    isNew: true, 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    description: 'Com design fluido e caimento impecável de alfaiataria, o Vestido Helena Marfim combina modéstia e sofisticação de forma singular. Confeccionado em crepe premium de seda estruturada, traz mangas delicadamente bufantes e um cinto estruturado com fivela dourada discreta. Ideal para cultos solenes, jantares e eventos formais que pedem presença elegante e minimalista.',
    colors: ['#F5F0E8', '#C89B5A', '#000000'],
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG'],
    gallery: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #1A1714 0%, #C89B5A 100%)',
      'linear-gradient(135deg, #2E2926 0%, #D4B896 100%)',
      'linear-gradient(135deg, #3D2B1F 0%, #E8C97A 100%)'
    ],
    reviews: [
      { name: 'Camila S.', rating: 5, comment: 'Caimento perfeito! O tecido é de uma qualidade absurda, digno de alta costura.' },
      { name: 'Aline R.', rating: 5, comment: 'Modéstia e beleza andam juntas nessa peça. Fiquei encantada com a embalagem perfumada.' },
      { name: 'Gisele M.', rating: 4, comment: 'Muito elegante, comprei o M e serviu perfeitamente. O toque do crepe é incrível.' }
    ]
  },
  { 
    id: 2, 
    name: 'Conjunto Executiva Gold', 
    price: 459.90, 
    category: 'FEMININO', 
    type: 'CONJUNTOS', 
    rating: 5.0, 
    image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&q=80&w=800',
    description: 'A tradução máxima da mulher contemporânea. O Conjunto Executiva Gold une Blazer alongado e Saia Lápis de alfaiataria premium na cor bege areia com detalhes de botões folheados a ouro escovado. Estruturado com ombreiras suaves e forro em cetim soft, proporciona conforto térmico incomparável e elegância indescritível para reuniões estratégicas ou pregações solenes.',
    colors: ['#D4B896', '#1A1714', '#3D2B1F'],
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    gallery: [
      'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #3D2B1F 0%, #C89B5A 100%)',
      'linear-gradient(135deg, #1A1714 0%, #F5F0E8 100%)',
      'linear-gradient(135deg, #2E2926 0%, #E8C97A 100%)'
    ],
    reviews: [
      { name: 'Sandra K.', rating: 5, comment: 'Sofisticado demais! Os botões dourados são joias à parte. Visto em congressos e chamo atenção pela elegância.' },
      { name: 'Patrícia L.', rating: 5, comment: 'Vale cada centavo. Costuras firmes, forro macio e corte impecável.' },
      { name: 'Fernanda O.', rating: 5, comment: 'Caimento soberbo. Um clássico eterno no guarda-roupa feminino.' }
    ]
  },
  { 
    id: 3, 
    name: 'Saia Midi Champagne', 
    price: 199.90, 
    category: 'FEMININO', 
    type: 'SAIAS', 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800',
    description: 'Delicadeza e fluidez traduzidas em tecido. A Saia Midi Champagne apresenta modelagem evasê plissada com brilho acetinado sutil e cós estruturado que valoriza a silhueta com total respeito à modéstia. Confeccionada em viscose de seda ecológica, se move harmoniosamente ao andar, trazendo um toque romântico e requintado a qualquer composição.',
    colors: ['#E8C97A', '#F5F0E8', '#000000'],
    sizes: ['P', 'M', 'G', 'GG'],
    gallery: [
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #C89B5A 0%, #1A1714 100%)',
      'linear-gradient(135deg, #D4B896 0%, #3D2B1F 100%)',
      'linear-gradient(135deg, #F5F0E8 0%, #E8C97A 100%)'
    ],
    reviews: [
      { name: 'Ester M.', rating: 5, comment: 'O plissado não se desfaz ao lavar, e o caimento champagne é extremamente nobre.' },
      { name: 'Débora A.', rating: 4, comment: 'Muito delicada e versátil. Combina tanto com salto quanto com sapatilha.' },
      { name: 'Júlia N.', rating: 5, comment: 'Estilo impecável, muito confortável e discreta.' }
    ]
  },
  { 
    id: 4, 
    name: 'Blazer Femme Noir', 
    price: 379.90, 
    category: 'FEMININO', 
    type: 'BLAZERS', 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    description: 'Um blazer de prestígio indispensável. O Blazer Femme Noir é desenhado com corte acinturado contemporâneo, lapelas clássicas estruturadas e acabamento invisível. Sua estrutura reforçada e forro premium em cetim preto garantem que você sinta confiança absoluta, vestindo a imponência do streetwear premium feminino em qualquer estação.',
    colors: ['#000000', '#3D2B1F', '#C89B5A'],
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG'],
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #1A1714 0%, #3D2B1F 100%)',
      'linear-gradient(135deg, #C89B5A 0%, #F5F0E8 100%)',
      'linear-gradient(135deg, #D4B896 0%, #E8C97A 100%)'
    ],
    reviews: [
      { name: 'Viviane T.', rating: 5, comment: 'Um luxo! Deixa qualquer look simples com cara de rico. caimento perfeito nos ombros.' },
      { name: 'Marta F.', rating: 5, comment: 'Excelente qualidade de tecido e corte impecável. Glaucia Boutique superou as expectativas.' },
      { name: 'Carla C.', rating: 4.8, comment: 'Atemporal e robusto. Veste extremamente bem.' }
    ]
  },
  { 
    id: 5, 
    name: 'Camisa Social Serenity', 
    price: 189.90, 
    category: 'MASCULINO', 
    type: 'CAMISAS', 
    isNew: true, 
    rating: 4.7, 
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    description: 'O básico elevado ao nível extraordinário. A Camisa Social Serenity é tecida em algodão egípcio fio 80 com fibra de linho nobre, garantindo leveza absurda, respiro térmico e toque super sedoso. Em tom azul serenity, possui colarinho firme e costuras francesas de altíssima costura, perfeita para cultos de domingo ou reuniões executivas.',
    colors: ['#88D49E', '#F5F0E8', '#000000'],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    gallery: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #1A1714 0%, #C89B5A 100%)',
      'linear-gradient(135deg, #3D2B1F 0%, #E8C97A 100%)',
      'linear-gradient(135deg, #2E2926 0%, #D4B896 100%)'
    ],
    reviews: [
      { name: 'Lucas H.', rating: 5, comment: 'Muito fresca e não amassa fácil. O tom de azul é elegante demais, super recomendo.' },
      { name: 'Ricardo B.', rating: 4, comment: 'Confortável e caimento moderno slim. Perfeito para uso diário em escritórios.' },
      { name: 'Thiago M.', rating: 5, comment: 'Algodão egípcio espetacular, toque incrível e durabilidade perceptível.' }
    ]
  },
  { 
    id: 6, 
    name: 'Conjunto Pastoral Premium', 
    price: 549.90, 
    category: 'MASCULINO', 
    type: 'CONJUNTOS', 
    rating: 5.0, 
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800',
    description: 'A personificação do respeito e distinção masculina. O Conjunto Pastoral Premium é um terno Slim completo (Paletó + Calça) confeccionado em Lã Fria Nobre Super 120 importada. Com corte clássico inglês, lapela entalhada e forro jacquard personalizado, oferece uma modelagem que desenha o porte masculino com máximo conforto e presença impecável no altar.',
    colors: ['#1A1714', '#3D2B1F', '#C89B5A'],
    sizes: ['M', 'G', 'GG', 'XG'],
    gallery: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #2E2926 0%, #E8C97A 100%)',
      'linear-gradient(135deg, #C89B5A 0%, #3D2B1F 100%)',
      'linear-gradient(135deg, #1A1714 0%, #D4B896 100%)'
    ],
    reviews: [
      { name: 'Pr. Marcos V.', rating: 5, comment: 'Imponente e extremamente confortável. A lã fria é ideal para usar nas ministrações sem passar calor.' },
      { name: 'Augusto S.', rating: 5, comment: 'Excelente qualidade. Caimento perfeito sem ajustes de alfaiate, impressionante.' },
      { name: 'Gabriel P.', rating: 5, comment: 'Alto padrão real! Um investimento na imagem pessoal de muito valor.' }
    ]
  },
  { 
    id: 7, 
    name: 'Blazer Masculino Clássico', 
    price: 429.90, 
    category: 'MASCULINO', 
    type: 'BLAZERS', 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    description: 'O coringa do homem de estilo refinado. Este Blazer Masculino Clássico apresenta corte estruturado semi-slim em sarja premium amaciada e detalhes em botões de madeira envernizada. Ideal para compor visuais esporte-fino elegantes, combinando perfeitamente com calças chino ou camisas de linho.',
    colors: ['#3D2B1F', '#1A1714', '#D4B896'],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #E8C97A 0%, #2E2926 100%)',
      'linear-gradient(135deg, #C89B5A 0%, #1A1714 100%)',
      'linear-gradient(135deg, #D4B896 0%, #3D2B1F 100%)'
    ],
    reviews: [
      { name: 'Fabrício J.', rating: 5, comment: 'Combina com tudo. Caimento confortável nos braços e ombros estruturados.' },
      { name: 'Pr. Daniel C.', rating: 4, comment: 'Material de primeira, muito chique e ideal para casamentos e retiros.' },
      { name: 'Pedro L.', rating: 5, comment: 'Excelente acabamento interno e bolsos úteis.' }
    ]
  },
  { 
    id: 8, 
    name: 'Camisa Linho Elegance', 
    price: 219.90, 
    category: 'MASCULINO', 
    type: 'CAMISAS', 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800',
    description: 'Rústico e sofisticado na mesma medida. A Camisa Linho Elegance é produzida em puro linho belga pré-encolhido. Suas fibras naturais conferem frescor nos dias quentes e uma textura clássica incomparável. O abotoamento em madrepérola e a modelagem solta proporcionam conforto irrestrito com visual nobre em qualquer ambiente social.',
    colors: ['#F5F0E8', '#D4B896', '#1A1714'],
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG'],
    gallery: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800',
      'linear-gradient(135deg, #3D2B1F 0%, #E8C97A 100%)',
      'linear-gradient(135deg, #2E2926 0%, #C89B5A 100%)',
      'linear-gradient(135deg, #F5F0E8 0%, #D4B896 100%)'
    ],
    reviews: [
      { name: 'Guilherme R.', rating: 5, comment: 'Linho maravilhoso, de gramatura robusta e toque macio na pele. Excelente corte.' },
      { name: 'Mateus A.', rating: 5, comment: 'Camisa sensacional. Veste perfeitamente e exala sofisticação.' },
      { name: 'Carlos E.', rating: 4.8, comment: 'Caimento despojado e muito elegante. Comprarei outras cores.' }
    ]
  }
];
