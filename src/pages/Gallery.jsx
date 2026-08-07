import { useState } from "react";
import Hero from "../components/Hero";
import "./Gallery.css";

import hero from "../assets/gallery-hero.jpeg";

// Images
import color1 from "../assets/gallery/images/color1.jpeg"
import color2 from "../assets/gallery/images/color2.jpeg"
import color3 from "../assets/gallery/images/color3.jpeg"
import color4 from "../assets/gallery/images/color4.jpeg"
import color5 from "../assets/gallery/images/color5.jpeg"
import color6 from "../assets/gallery/images/color6.jpeg"
import compp1 from "../assets/gallery/images/compp1.jpeg";


// // Videos
import colorv1 from "../assets/gallery/videos/colorv1.mp4";
import colorv2 from "../assets/gallery/videos/colorv2.mp4";
import colorv3 from "../assets/gallery/videos/colorv3.mp4";
import comp1 from "../assets/gallery/videos/comp1.mp4";
import comp2 from "../assets/gallery/videos/comp2.mp4";
import comp3 from "../assets/gallery/videos/comp3.mp4";
import comp4 from "../assets/gallery/videos/comp4.mp4";
import comp5 from "../assets/gallery/videos/comp5.mp4";
import e1 from "../assets/gallery/videos/e1.mp4";
import e2 from "../assets/gallery/videos/e2.mp4";
import e3 from "../assets/gallery/videos/e3.mp4";
import e4 from "../assets/gallery/videos/e4.mp4";
import e5 from "../assets/gallery/videos/e5.mp4";
import e6 from "../assets/gallery/videos/e6.mp4";



function Gallery() {

const [filter,setFilter]=useState("all");

const gallery=[

{
id:1,
type:"image",
category:"color",
src:color1
},

{
id:2,
type:"image",
category:"color",
src:color2
},

{
id:3,
type:"image",
category:"color",
src:color3
},

{
id:4,
type:"image",
category:"color",
src:color4
},

{
id:5,
type:"image",
category:"color",
src:color5
},

{
id:6,
type:"image",
category:"color",
src:color6
},

{
id:7,
type:"video",
category:"color",
src:colorv1
},

{
id:8,
type:"video",
category:"color",
src:colorv2
},

{
id:9,
type:"video",
category:"competition",
src:comp1
},

{
id:10,
type:"video",
category:"competition",
src:comp2
},

{
id:11,
type:"video",
category:"competition",
src:comp3
},

{
id:12,
type:"video",
category:"competition",
src:comp4
},

{
id:13,
type:"video",
category:"competition",
src:comp5
},

{
id:14,
type:"video",
category:"events",
src:e1
},

{
id:15,
type:"video",
category:"events",
src:e2
},

{
id:16,
type:"video",
category:"events",
src:e3
},

{
id:17,
type:"video",
category:"events",
src:e4
},

{
id:18,
type:"video",
category:"events",
src:e5
},

{
id:19,
type:"video",
category:"events",
src:e6
},

{
id:20,
type:"video",
category:"color",
src:colorv3
},

{
id:21,
type:"image",
category:"competition",
src:compp1
}

];

const filteredGallery=
filter==="all"?gallery:
filter==="photos"?gallery.filter(item=>item.type==="image")
:filter==="videos"?gallery.filter(item=>item.type==="video")
:gallery.filter(item=>item.category===filter);

return(

<>

<Hero

title="Gallery"

subtitle="Capturing Smiles, Learning & Memorable Moments"

image={hero}

/>

<section className="gallery-filter">

<button
className={filter==="all"?"active":""}
onClick={()=>setFilter("all")}
>
All
</button>

<button
className={filter==="photos"?"active":""}
onClick={()=>setFilter("photos")}
>
Photos
</button>

<button
className={filter==="videos"?"active":""}
onClick={()=>setFilter("videos")}
>
Videos
</button>

<button
className={filter==="color"?"active":""}
onClick={()=>setFilter("color")}
>
Color Day
</button>

<button
className={filter==="competition"?"active":""}
onClick={()=>setFilter("competition")}
>
Competitions
</button>

<button
className={filter==="events"?"active":""}
onClick={()=>setFilter("events")}
>
Events
</button>

</section>

<section className="gallery-grid">

{

filteredGallery.map((item)=>(

<div
className="gallery-card"
key={item.id}
>

{

item.type==="image"

?

<img
src={item.src}
alt=""
/>

:

<video controls>

<source
src={item.src}
type="video/mp4"
/>

</video>

}

</div>

))

}

</section>

</>

)

}

export default Gallery;