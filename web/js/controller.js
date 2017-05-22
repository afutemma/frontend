var cartCount = 0, installments = [], total = 0, cartItems = [], prods = {
	"items" : [
			{
				"product" : {
					"id" : 2321312,
					"name" : "Smartphone Apple iPhone 7 128GB",
					"images" : [
							"http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb_600x600-PU98460_1.jpg",
							"http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_2_c.jpg?v=2347575274",
							"http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_3_c.jpg?v=318433138",
							"http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_4_c.jpg?v=33273730" ],
					"price" : {
						"value" : 3509.10,
						"installments" : 5,
						"installmentValue" : 389.90
					}
				}
			},
			{
				"product" : {
					"id" : 9971,
					"name" : "Smart TV Samsung SÃ©rie 4 UN32J4300AG 32 polegadas LED Plana",
					"images" : [
							"http://mthumbs.buscape.com.br/tv/smart-tv-samsung-serie-4-un32j4300ag-32-polegadas-led-plana_600x600-PU95547_1.jpg",
							"http://thumbs.buscape.com.br/__400x400-PU95547_2_c.jpg?v=3988579075",
							"http://thumbs.buscape.com.br/__400x400-PU95547_4_c.jpg?v=4208003525",
							"http://thumbs.buscape.com.br/__231312400x400-PU95547_5_c.jpg?v=1473261122" ],
					"price" : {
						"value" : 1139.90,
						"installments" : 10,
						"installmentValue" : 134.11
					}
				}
			},
			{
				"product" : {
					"id" : 6717131,
					"name" : "CÃ¢mera Digital Canon EOS Rebel T5i 18.0 Megapixels",
					"images" : [ "http://mthumbs.buscape.com.br/camera-digital/canon-eos-rebel-t5i-18-0-megapixels_600x600-PU7bf7b_1.jpg" ],
					"price" : {
						"value" : 1999.20,
						"installments" : 10,
						"installmentValue" : 235.20
					}
				}
			},
			{
				"product" : {
					"id" : 671713,
					"name" : "Lenovo IdeaPad 310 80UH0004BR Intel Core i7-6500U 2.5 GHz 8192 MB 1024 GB",
					"images" : [ "http://mthumbs.buscape.com.br/notebook/lenovo-ideapad-310-80uh0004br-intel-core-i7-6500u-2-5-ghz-8192-mb-1024-gb_600x600-PU98e6e_1.jpg" ],
					"price" : {
						"value" : 2599.00,
						"installments" : 10,
						"installmentValue" : 259.90
					}
				}
			} ]
};

$(document).ready(function() {
	$.each(prods.items, function(key, val) {

		$("#produtos").append(listarProduto(val));

	});

	$(".miniature").bind('click');

	/*
	 * $.ajax({ dataType: "json", url: "../view/data.json", mimeType:
	 * "application/json", success: function(result){ prods = result;
	 * $.each(result.items, function(key, val) {
	 * 
	 * $("#itens").append(addItem(val));
	 * 
	 * }); }, error: function(e){ console.log(e); } });
	 */

});

function cart() {
	if (cartItems.length > 0) {
		if ($("#cart").is(":visible")) {
			$("#cart").hide(500);
		} else {
			$("#cart").show(500);
		}
	}
}

function addItem(id) {
	if (cartItems.indexOf(id) == -1) {
		if (!$("#cart").is(":visible")) {
			$("#cart").show();
		}
		cartCount++;
		$(".menu-n-cart").html(cartCount);
		$(".menu-n-cart").show();
		var val = getDetailsFromProduct(id);
		cartItems.push(id);
		installments.push(val.installments);
		var item = '<div class="itemanimate" id="oncart-'
				+ id
				+ '"><div class="item col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="col-xs-2 col-sm-2 col-md-1 col-lg-1"><img class="itemimg" src="'
				+ val.image
				+ '" id="itemimg"></div><div class="col-xs-8 col-sm-8 col-md-10 col-lg-10"><div class="itemname">'
				+ convertString(val.name)
				+ '</div><div class="itemvalor"><p>'
				+ val.installments
				+ "x R$"
				+ val.iv
				+ '</p><p>R$ '
				+ val.price
				+ ' à vista</p></div></div><div class="col-xs-2 col-sm-2 col-md-1 col-lg-1 removeitem"><a href="javascript:remove('
				+ id + ')">x</a></div></div>';

		var appended = $(item).appendTo("#itens");
		appended.css('opacity');
		appended.addClass('in');

		calculateTotal(val.installments, val.price, val.iv, true);
	}
}

function remove(id) {
	$("#oncart-" + id).removeClass('in');
	cartCount--;
	$(".menu-n-cart").html(cartCount);
	if (cartCount === 0) {
		$(".menu-n-cart").hide();
		$("#cart").hide();
	}

	installments.splice(cartItems.indexOf(id), 1);
	cartItems.splice(cartItems.indexOf(id), 1);
	var val = getDetailsFromProduct(id);
	calculateTotal(val.installments, val.price, val.iv, false);
	$("#oncart-" + id).remove();
}

function convertString(s) {
	return decodeURIComponent(escape(s));
}

function calculateTotal(i, p, iv, isAdd) {
	var ins = Math.max.apply(0, installments);

	if (isAdd) {
		total += p;
	} else {
		total -= p;
	}

	$("#installments").html(
			ins + "x R$ "
					+ formatarPreco((total / 10).toFixed(2).replace(".", "")));
	$("#totalprice").html(
			"ou R$ " + formatarPreco(total.toFixed(2).replace(".", ""))
					+ " à vista");

}

function listarProduto(val) {
	var images = "";
	var f = function(url, index, id) {
		$("#mini-" + index + "-" + id).attr("src", url);
		$("#main-" + index + "-" + id).attr("src", url);
	};
	var prod = '<div class="produto col-sm-12 col-md-12" id="prod-'
			+ val.product.id
			+ '">'
			+ '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-1 miniatures"><ul>';
	for (var i = 0; i < val.product.images.length; i++) {
		if (i === 0) {
			prod += '<li><img class="miniature selectedimage ' + val.product.id
					+ '" id="mini-' + i + '-' + val.product.id
					+ '" onclick="toggleImage(' + i + ',' + val.product.id
					+ ')" src=""/></li>';
			images += '<img class="mainphoto ' + val.product.id + '" id="main-'
					+ i + '-' + val.product.id + '" src="">';

			testImage(val.product.images[i], i, val.product.id, f)
		} else {
			prod += '<li><img class="miniature ' + val.product.id
					+ '" id="mini-' + i + '-' + val.product.id
					+ '" onclick="toggleImage(' + i + ',' + val.product.id
					+ ')" src=""/></li>';
			images += '<img class="itemphoto ' + val.product.id + '" id="main-'
					+ i + '-' + val.product.id + '" src="">';
			testImage(val.product.images[i], i, val.product.id, f)
		}
	}

	prod += '</ul></div><div class="col-xs-4 col-sm-3 col-md-2 col-lg-2 photo">'
			+ images
			+ '</div> <div class="col-xs-6 col-sm-7 col-md-8 col-lg-9 description"><div class="full-line productname bigtext">'
			+ convertString(val.product.name)
			+ '<i onclick="fav(this)" class="fa fa-heart-o"></i> </div><div class="full-line precoproduto">'
			+ '<hr class="productline"/><div class="full-line"><span class="melhorpreco">MELHOR PREÇO</span></div>'
			+ '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 prices no-lateral"><div class="full-line"><span class="mediumtext greentext">'
			+ val.product.price.installments
			+ "x R$</span><span class='bigtext greentext'> "
			+ formatarPreco(val.product.price.installmentValue.toFixed(2)
					.replace(".", ""))
			+ '</div><div class="full-line"><span class="greytext smalltext">ou</span> <span class="smalltext greentext">R$ '
			+ formatarPreco(val.product.price.value.toFixed(2).replace(".", ""))
			+ '</span> <span class="smalltext greytext">à vista<span></div></div>'
			+ '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 prices"><a href="javascript:addItem('
			+ val.product.id
			+ ')" class="btn addbtn pull-right">Adicionar ao carrinho <i class="fa fa-angle-right"></i></a></div>'
			+ '</div></div></div>';

	return prod;

}

function fav(e) {
	$(e).toggleClass("fa-heart-o");
	$(e).toggleClass("fa-heart");
}

function formatarPreco(v) {
	v = v.replace(/([0-9]{2})$/g, ",$1");
	if (v.length > 6)
		v = v.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
	return v;
}

function getDetailsFromProduct(id) {
	for (var i = 0; i < prods.items.length; i++) {
		if (prods.items[i].product.id == id) {
			return {
				name : prods.items[i].product.name,
				installments : prods.items[i].product.price.installments,
				iv : formatarPreco(prods.items[i].product.price.installmentValue
						.toFixed(2).replace(".", "")),
				price : prods.items[i].product.price.value,
				image : prods.items[i].product.images[0]
			}
		}
	}
}

function toggleImage(i, id) {
	var main = $("#main-" + i + "-" + id);
	var preview = $("img.mainphoto." + id);

	if (main.attr('id') !== preview.attr('id')) {

		if (main.hasClass("itemphoto")) {
			main.removeClass("itemphoto");
			main.addClass("mainphoto");
		}
		if (preview.hasClass("mainphoto")) {
			preview.removeClass("mainphoto");
			preview.addClass("itemphoto");
		}

		$("img.selectedimage." + id).removeClass("selectedimage");
		$("#mini-" + i + "-" + id).addClass("selectedimage");

	}
}

function testImage(url, index, id, callback) {
	var timedOut = false, timer;
	var img = new Image();
	img.onerror = img.onabort = function() {
		if (!timedOut) {
			clearTimeout(timer);
			callback("../images/notfound.png", index, id);
		}
	};
	img.onload = function() {
		if (!timedOut) {
			clearTimeout(timer);
			callback(url, index, id);
		}
	};
	img.src = url;
	timer = setTimeout(function() {
		timedOut = true;
		callback(url, index, id);
	}, 5000);
}
