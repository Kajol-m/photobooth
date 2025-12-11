// "use client";
// import { useState } from "react";
// import { usePhotoboothStore } from "@/store/usePhotoboothStore";
// import { v4 as uuidv4 } from "uuid";

// const collection = [
//   {
//     name: "Popular",
//     value: [
//       "/assets/sea-stickers/bubbles.png",
//       "/assets/sea-stickers/dolphin.png",
//     ],
//   },
//   {
//     name: "Sea",
//     value: [
//       "/assets/sea-stickers/boat.png",
//       "/assets/sea-stickers/bubbles.png",
//       "/assets/sea-stickers/coral-pearl.png",
//       "/assets/sea-stickers/coralreef.png",
//       "/assets/sea-stickers/coral.png",
//       "/assets/sea-stickers/crab.png",
//       "/assets/sea-stickers/dolphin.png",
//       "/assets/sea-stickers/fish.png",
//       "/assets/sea-stickers/grass-sea.png",
//       "/assets/sea-stickers/octo.png",
//       "/assets/sea-stickers/octopus.png",
//       "/assets/sea-stickers/round-shell.png",
//       "/assets/sea-stickers/sea-grass.png",
//       "/assets/sea-stickers/starfish.png",
//     ],
//   },
//   {
//     name: "Love",
//     value: [
//       "/assets/love-stickers/bow.png",
//       "/assets/love-stickers/double-shine.png",
//       "/assets/love-stickers/heart-bow.png",
//       "/assets/love-stickers/letter.png",
//       "/assets/love-stickers/love-bow.png",
//       "/assets/love-stickers/love-rose.png",
//       "/assets/love-stickers/love.png",
//       "/assets/love-stickers/opened-letter.png",
//       "/assets/love-stickers/pink-heart.png",
//       "/assets/love-stickers/rose.png",
//       "/assets/love-stickers/shine.png",
//     ],
//   },
//   {
//     name:"Halloween",
//     value:[
//       "assets/halloween-stickers/bat.png",
//       "assets/halloween-stickers/boo.png",
//       "assets/halloween-stickers/orange-candy.png",
//       "assets/halloween-stickers/pumpkin.png",
//       "assets/halloween-stickers/purple-candy.png",
//       "assets/halloween-stickers/skeleton.png",
//       "assets/halloween-stickers/spider.png",
//       "assets/halloween-stickers/web.png",
//       "assets/halloween-stickers/witch-thing.png",
//       "assets/halloween-stickers/witch's-hat.png",
//     ]
//   }
// ];

// const Sticker = () => {
//   const [selectedCollection, setSelectedCollection] = useState(collection[0]);
//   const { addDecoration } = usePhotoboothStore();

//   const handleStickerClick = (img: string) => {
//     addDecoration({
//       id: uuidv4(),
//       type: "sticker",
//       x: 100,
//       y: 150,
//       scale: 1,
//       rotation: 0,
//       props: { src: img },
//     });
//   };

//   return (
//     <div className="p-6 flex flex-col gap-6 items-start bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-800">Sticker Picker</h2>

//       {/* Collection Buttons */}
//       <div className="flex flex-wrap gap-3">
//         {collection.map((sticker) => (
//           <button
//             key={sticker.name}
//             onClick={() => setSelectedCollection(sticker)}
//             className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-150
//               ${
//                 selectedCollection.name === sticker.name
//                   ? "bg-blue-500 text-white border-blue-600"
//                   : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//               }`}
//           >
//             {sticker.name}
//           </button>
//         ))}
//       </div>

//       {/* Sticker Display */}
//       <div className="flex flex-wrap gap-4 justify-start">
//         {selectedCollection.value.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`${selectedCollection.name}-${index}`}
//             className="w-16 h-16 object-contain rounded-lg cursor-pointer hover:scale-110 transition"
//             onClick={() => handleStickerClick(img)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sticker;
"use client";
import { useState } from "react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { v4 as uuidv4 } from "uuid";

// ... (Keep your existing `collection` array here) ...
const collection = [
  {
    name: "Popular",
    value: [
      "/assets/sea-stickers/bubbles.png",
      "/assets/sea-stickers/dolphin.png",
    ],
  },
  {
    name: "Sea",
    value: [
      "/assets/sea-stickers/boat.png",
      "/assets/sea-stickers/bubbles.png",
      "/assets/sea-stickers/coral-pearl.png",
      "/assets/sea-stickers/coralreef.png",
      "/assets/sea-stickers/coral.png",
      "/assets/sea-stickers/crab.png",
      "/assets/sea-stickers/dolphin.png",
      "/assets/sea-stickers/fish.png",
      "/assets/sea-stickers/grass-sea.png",
      "/assets/sea-stickers/octo.png",
      "/assets/sea-stickers/octopus.png",
      "/assets/sea-stickers/round-shell.png",
      "/assets/sea-stickers/sea-grass.png",
      "/assets/sea-stickers/starfish.png",
    ],
  },
  {
    name: "Love",
    value: [
      "/assets/love-stickers/bow.png",
      "/assets/love-stickers/double-shine.png",
      "/assets/love-stickers/heart-bow.png",
      "/assets/love-stickers/letter.png",
      "/assets/love-stickers/love-bow.png",
      "/assets/love-stickers/love-rose.png",
      "/assets/love-stickers/love.png",
      "/assets/love-stickers/opened-letter.png",
      "/assets/love-stickers/pink-heart.png",
      "/assets/love-stickers/rose.png",
      "/assets/love-stickers/shine.png",
    ],
  },
  {
    name:"Halloween",
    value:[
      "assets/halloween-stickers/bat.png",
      "assets/halloween-stickers/boo.png",
      "assets/halloween-stickers/orange-candy.png",
      "assets/halloween-stickers/pumpkin.png",
      "assets/halloween-stickers/purple-candy.png",
      "assets/halloween-stickers/skeleton.png",
      "assets/halloween-stickers/spider.png",
      "assets/halloween-stickers/web.png",
      "assets/halloween-stickers/witch-thing.png",
      "assets/halloween-stickers/witch's-hat.png",
    ]
  }
];


const Sticker = () => {
  const [selectedCollection, setSelectedCollection] = useState(collection[0]);
  const { addDecoration } = usePhotoboothStore();

  const handleStickerClick = (img: string) => {
    addDecoration({
      id: uuidv4(),
      type: "sticker",
      // ✅ FIX: Use 'transform' instead of x/y/rotation
      transform: "translate(100px, 150px) rotate(0deg) scale(1, 1)",
      props: { src: img },
    });
  };

  return (
    <div className="p-4 flex flex-col gap-3 items-start bg-[#F5F5DA] w-full border-3 border-[#CA152A]">
      <h2 className="text-xl font-semibold text-[#CA152A]">STICKERS</h2>

      {/* Collection Buttons */}
      <div className="flex flex-wrap gap-2">
        {collection.map((sticker) => (
          <button
            key={sticker.name}
            onClick={() => setSelectedCollection(sticker)}
            className={`px-3 py-1 text-xs font-medium transition-all duration-150 border border-[#CA152A]
              ${
                selectedCollection.name === sticker.name
                  ? "bg-[#CA152A] text-[#F5F5DA]"
                  : "bg-[#F5F5DA] text-[#CA152A] hover:border-[#CA152A]"
              }`}
          >
            {sticker.name}
          </button>
        ))}
      </div>

      {/* Sticker Grid */}
      <div className="flex flex-wrap gap-4 h-25 md:h-36 overflow-y-auto content-start w-full">
        {selectedCollection.value.map((img, index) => (
          <div 
             key={index} 
             className="w-10 h-10 md:w-16 md:h-16 p-1 border border-[#CA152A] hover:bg-gray-50 cursor-pointer"
             onClick={() => handleStickerClick(img)}
          >
            <img
              src={img}
              alt="sticker"
              className="w-full h-full object-contain pointer-events-none hover:scale-1.2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sticker;