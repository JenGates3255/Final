_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var myItems = [

	// {	
	// 	name: 'purple tank',
	// 	category: 'tops',
	// 	type:'tank',
	// 	color:'purple',
	// 	img:'/mainpagephotos/tops/tanks/tank.jpg'
	// },
	// {
	// 	name: 'black tank',
	// 	category: 'tops',
	// 	type:'tank',
	// 	color:'black',
	// 	img:'/mainpagephotos/tops/tanks/tank%202.jpg'
	// },
	// {
	// 	name: 'black striped',
	// 	category: 'tops',
	// 	type:'long-sleeve',
	// 	color: 'black',
	// 	img: '/mainpagephotos/tops/longslv/long%20sleeve%20t.jpg'
	// },
	// {
	// 	name:'blue slouchie',
	// 	category: 'tops',
	// 	type:'long-sleeve',
	// 	color:'blue',
	// 	img:'/mainpagephotos/tops/longslv/long%20sleeve%20t%202.jpg'
	// },
	// {
	// 	name:'California tee',
	// 	category: 'tops',
	// 	type:'short-sleeve',
	// 	color:'black',
	// 	img:'/mainpagephotos/tops/shortslv/short%20sleeve%20t.jpg'
	// },
	// {
	// 	name:'teal short sleeve',
	// 	category: 'tops',
	// 	type:'short-sleeve', 
	// 	color:'blue',
	// 	img:'/mainpagephotos/tops/shortslv/short%20sleeve%20t%202.jpg'
	// },
	// {
	// 	name: 'black slacks',
	// 	category:'bottoms',
	// 	type:'pants',
	// 	color:'black',
	// 	img:'/mainpagephotos/bottoms/pants/pants.jpg'
	// },
	// {
	// 	name:'khaki slacks',
	// 	category:'bottoms',
	// 	type:'pants',
	// 	color:'beige',
	// 	img:'/mainpagephotos/bottoms/pants/pants%202.jpg'
	// },
	// {
	// 	name:'jeans',
	// 	category:'bottoms',
	// 	type:'pants',
	// 	color:'denim',
	// 	img:'/mainpagephotos/bottoms/pants/pants%203.jpg'
	// },
	// {
	// 	name:'jean shorts',
	// 	category:'bottoms',
	// 	type:'shorts',
	// 	color:'denim',
	// 	img:'/mainpagephotos/bottoms/shorts/shorts.jpg'
	// },
	// {
	// 	name: 'black mini skirt',
	// 	category:'bottoms',
	// 	type:'skirts',
	// 	color:'black',
	// 	img:'/mainpagephotos/bottoms/skirts/skirt.jpg'
	// },
	// {
	// 	name:'white pencil skirt',
	// 	category:'bottoms',
	// 	type:'skirts',
	// 	color:'white',
	// 	img:'/mainpagephotos/bottoms/skirts/skirt%203.jpg'
	// },
	// {
	// 	name:'black skater skirt',
	// 	category:'bottoms',
	// 	type:'skirts',
	// 	color:'black',
	// 	img:'/mainpagephotos/bottoms/skirts/skirt%202.jpg'
	// },
	// {
	// 	name:'pink maxi',
	// 	category:'dresses',
	// 	type: 'long-dress',
	// 	color:'pink',
	// 	img:'/mainpagephotos/dresses/long%20/long%20dress.jpg'
	// },
	// {
	// 	name:'white maxi',
	// 	category:'dresses',
	// 	type:'long-dress',
	// 	color:'white',
	// 	img:'/mainpagephotos/dresses/long%20/long%20dress%202.jpg'
	// },
	// {
	// 	name:'floral dress',
	// 	category:'dresses',
	// 	type:'short-dress',
	// 	color: 'red',
	// 	img:'/mainpagephotos/dresses/short/short%20dress%204.jpg'
	// },
	// {
	// 	name:'pink short dress',
	// 	category:'dresses',
	// 	type:'short-dress',
	// 	color:'pink',
	// 	img:'/mainpagephotos/dresses/short/short%20dress.jpg'
	// },
	// {
	// 	name:'white short dress',
	// 	category:'dresses',
	// 	type:'short-dress',
	// 	color:'white',
	// 	img:'/mainpagephotos/dresses/short/short%20dress%203.jpg'
	// },
	// {
	// 	name:'black short dress',
	// 	category:'dresses',
	// 	type:'short-dress',
	// 	color:'black',
	// 	img:'/mainpagephotos/dresses/short/short%20dress%202.jpg'
	// },
];

myItems = window.items;

// var newItem = function(name, category, type, color, img){	
// 	name: 'name',
// 	category: 'category',
// 	type: 'type',
// 	color: 'color',
// 	img: 'img'
// }


// assign unique ID to each item 
_.each(myItems, function(item) {
	item.id = _.uniqueId('item');
	item.info = JSON.stringify(item);
});
 

 // Default setting to all pictured items
var colTemplate = '\
	<div data-info="{{ info }}" id="{{ id }}" class="fullImage col-md-2 col-sm-2 col-xs-2">\
      <a href="#" class="thumbnail">\
        <img class="closetImage" src="{{ itemimg }}" alt="{{ itemname }}">\
      </a>\
      <button class="largerView btn btn-primary btn-sm" data-toggle="modal" data-target="#{{ id }}Modal">\
        Larger View\
      </button>\
       <div class="modal fade" id="{{ id }}Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
        <div class="modalStyling modal-dialog">\
          <div class="modal-content">\
            <div class="modal-body text-left">\
             <img class="modalImage" src="{{ itemimg }}" alt="{{ itemname }}">\
            </div>\
            <div class="modal-footer">\
            	<form action="deleteItem/{{ _id }}" method="post" class="deleteform">\
                	<button type="submit" class="deleteItem btn btn-danger">Delete Item</button>\
                </form>\
                <button type="submit" class="btn btn-info" data-dismiss="modal">Close</button> \
                <button type="submit" class="sell btn btn-info"> Sell </button> \
             </div>\
          </div>\
        </div>\
      </div>\
    </div>';
var suggestedItemTemplate = '\
	<a data-info="{{ info }}" href="#" data-toggle="modal" data-target="#{{ id }}Modal" data-dismiss="modal">\
		<img class="suggestedImage" src="{{ itemimg }}">\
	</a>';

// var nextItemTemplate = '\
//     <div class="modal fade" id="{{ id }}Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
//         <div class="modalStyling modal-dialog">\
//           <div class="modal-content">\
//             <div class="modal-body text-left">\
//              <img class="modalImage" src="{{ itemimg }}" alt="{{ itemname }}">\
//             </div>\
//             <div class="modal-footer">\
//             	<form action="deleteItem/{{ _id }}" method="post" class="deleteform">\
//                 	<button type="submit" class="deleteItem btn btn-danger">Delete Item</button>\
//                 </form>\
//                 <button type="submit" class="btn btn-info" data-dismiss="modal">Close</button> \
//             </div>\
//           </div>\
//         </div>\
//     </div>';


$(document).on('ready', function() {

	
	var findSuggestedItems = function(myItems, filter){
		//setting variable for basic colors
		var versatileColors = ['cream','black','white','beige','denim', 'gray', 'gold', 'silver'];
		//setting variables for restsrictive colors that dont match with everything
		var restrictiveColors = ['red','orange','yellow','green','blue','purple','pink'];
		// setting limit on ow many suggested items shoe
		var limit = 3; 


		var filtered = _.filter(myItems, function(item){
			//filtering tops by color and suggesting matching bottoms 
			//
			//tops can have suggested: 
			//bottoms  outerwear accessories  shoes (based on color)
			if (filter.category === 'tops' && ['bottoms', 'outerwear', 'accessories', 'shoes'].indexOf(item.category) > -1) {
				if(versatileColors.indexOf(filter.color)){
					return true
				}
				if (restrictiveColors.indexOf(filter.color) && versatileColors.indexOf(item.color)) {
					return true
				}
			};
			//filtering bottoms by color and suggesting tops to match
			//
			//bottoms can have suggested: 
			//tops  outerwear  accessories  shoes (based on color)
			if (filter.category === 'bottoms' && ['tops','outerwear','accessories','shoes'].indexOf(item.category) > -1) {
				if(versatileColors.indexOf(filter.color)){
					return true
				}
				if (restrictiveColors.indexOf(filter.color) && versatileColors.indexOf(item.color)) {
					return true
				}
			}
			// Dresses can have suggested:
			// outerwear  accessories  shoes(based on color)
			if (filter.category === 'dresses' && ['outerwear','accessories','shoes'].indexOf(item.category) > -1) {
				if(versatileColors.indexOf(filter.color)) {
					return true
				}
				if (restrictiveColors.indexOf(filter.color) && versatileColors.indexOf(item.color)) {
					return true
				}
			}
			// outerwear can have suggested:
			// ALL(based on color)
			if (filter.category === 'outerwear' && ['tops','bottoms','dresses','accessories','shoes'].indexOf(item.category) > -1) {
				if(versatileColors.indexOf(filter.color)){
					return true
				}
				if (restrictiveColors.indexOf(filter.color) && versatileColors.indexOf(item.color)) {
					return true
				}
			}
			// accessories can have suggested:
			// ALL(based on color)
			if (filter.category === 'accessories' && ['tops','bottoms','dresses','outerwear','shoes'].indexOf(item.category) > -1) {
				if(versatileColors.indexOf(filter.color)){
					return true
				}
				if (restrictiveColors.indexOf(filter.color) && versatileColors.indexOf(item.color)) {
					return true
				}
			}
			// shoes can have suggested:
			// ALL (based on color)
			if (filter.category === 'shoes' && ['tops','bottoms','dresses','accessories','outerwear'].indexOf(item.category) > -1) {
				if(versatileColors.indexOf(filter.color)){
					return true
				}
				if (restrictiveColors.indexOf(filter.color) && versatileColors.indexOf(item.color)) {
					return true
				}
			}
		});
		
		if (filtered.length > limit) {
			//create emty array to push random suggested items into
			var filterLimited = [];
			while (limit--){
				// create variable with random selection functionality (selecting item from 'filtered' variable)
				var randomitem = filtered.splice(Math.floor(Math.random()*filtered.length),1);

				filterLimited.push(randomitem[0]);

			}
			return filterLimited
		}

		return filtered
	};  // end of findSuggestedItem



	var addItem = function(item) {
		//calling underscore .template method- dynamically 		
		var template = _.template(colTemplate);
		var newElement = $(template(item));
		$('#catalogItems .row').append(newElement);

		newElement.on('shown.bs.modal', function(e){
			// console.log('Hello World');
			//var fullImage = $(this).closest('.fullImage')
		
				var fullImageID = $(this).attr('id')
			
				var foundItem =_.findWhere(myItems,{id:fullImageID})
					 // To find selected item CATEGORY
				var foundCategory = foundItem.category 
					 // To find selected item TYPE
				var foundType = foundItem.itemtype
			 		// To find seleceted item COLOR
				var foundColor = foundItem.color
				
				// console.log(foundCategory)
				// console.log(foundType)
				// console.log(foundColor)

				var filtered = findSuggestedItems(myItems, foundItem)
				console.log(filtered);
				var $container = $('<div class="suggestedItemContainer">');

				_.each(filtered, function(item ){
					var html = _.template(suggestedItemTemplate, item);
					$container.append(html);

				})
				$(this).find('.modal-body').append($container);
				// console.log('hi')
			// $container.on('click', function(){
			// 	//var relatedItem = _.findWhere(myItems,{id:fullImageID})
			// })
			// 	var newtemp = _.template(nextItemTemplate);
			// 	var newElItem = $(newtemp(item)
			// 		newElItem.on('show.bs.modal', function(){
			// 			var fullImageID = $(this).attr('id')
			// 		})
			// })
				
		})
		newElement.on('hidden.bs.modal', function(){
			$(this).find('.suggestedItemContainer').remove();

		})
	};   //end of add item 

// .each- acts as 'for loop' but with underscore
// 'item' parameter is array of objects from myItems 
	_.each(myItems, addItem);

// selecting from menu items on sidebar
	$('.selectedCategory').on('click', function(){
		 var type = $(this).attr("data-type");
		 console.log(type);
			_.each(myItems, function(item) {
				if(type === item.itemtype){
					$('#' + item.id).show();
				}
				else {
					$('#' + item.id).hide();
				}
			});
	});

		//reset page to view all images
	$('.view-all').on('click', function(){
		// console.log('helloworld')
			$('.fullImage').show();
	})

	
	$(document).on('click','.deleteItem', function(){
		// console.log('hello')
		//  var id = $(this).attr('data-delete-id');

	 // 	$(this).parents('.modal').one('hidden.bs.modal', function (e) {
		// 	 $('#' + id).remove();
		// });
	});


		// pulling values of selected options and pushing to myItem array
	$('.newItemForm').on('submit',function(e){
		// e.preventDefault();
		var item = {
			name: $('.newItemName').val(),
			category: $('.newItemCategory').val(),
			type: $('.newItemType').val(),
			color: $('.newItemColor').val(),
			img: $('.newItemImg').val(),
			id: _.uniqueId('item')
		};			//reset form after submit
				//this.reset();
				//addItem(item);
			//myItems.push(item);		
	});

	$('.categoryType').on('click', function(){
	 var category = $(this).attr("data-type");
	 console.log(category);
		_.each(myItems, function(item) {
			if(category === item.category){
				$('#' + item.id).show();
			}
			else {
				$('#' + item.id).hide();
			}
		});
	});	

	$.get('/etsyItems', { n: 10 }, function(data) {
		console.log(data)
		for (var i = 0; i < data.length; i++) {
			var etsyImg = data[i].imagesInfo[0].url_170x135;
			var etsyPrice = data[i].price;
			var etsyURL = data[i].url;
			$('.etsyShopItem').append('<a href='+etsyURL+'>'+'<img src='+etsyImg+'></a>'+'<p>'+etsyPrice+'</p>')
		};
			console.log(etsyImg)

	});

});


 //end of doc.on ready