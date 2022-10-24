// $('.owl-carousel').owlCarousel({
//   center:true,
//   loop:true,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:3
//       },
//       1000:{
//           items:5
//       }
//   }
// })

$('.owl-carousel').owlCarousel({
  items:4,
  loop:false,
  center:true,
  margin:10,
  URLhashListener:true,
  autoplayHoverPause:true,
  startPosition: 'URLHash'
});