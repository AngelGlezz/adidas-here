var ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
var ventana_ancho = $(window).width();
var disable=true;
var active_ace=false;
var input_text=false;
var input_text2=false;
var input_goles=false;
var input_radio=false;
var tenis_name="";
var respuestas_array = new Array();
var final_time = 0;
var aciertos = 0;

function countMaxValue(array_elements) {

	var maxValue = 0;
	var maxNum = -1;

    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                
                if(cnt > maxValue ){
                	maxValue = cnt;
                	maxNum = current;
                }
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        if(cnt > maxValue ){
           maxNum = current;
        }
    }

    return maxNum;

}

$("#indepth_contador_circle input").css("margin-top",0);

$("#indepth_boton_empezar").on("click",function(){
	$("#indepth_boton_empezar").click(false);
	 ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();

	 var data = {
				  "preguntas": [
				    {
				      "pregunta": '<img src="images/preguntas/P1.png">',
				      "respuestas": [
				        {
				          "respuesta": "Intento todas las jugadas solo. Seguro una acaba en gol",
				          "tipo": "x"
				        },
				        {
				          "respuesta": "Controlo la situación y hago que el equipo juegue mejor para acabar ganando",
				          "tipo": "p"
				        }
				        ,
				        {
				          "respuesta": "Cargo al equipo al hombro y me sacó una jugada fuera del guión para poder ganar",
				          "tipo": "n"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/P2.png">',
				      "respuestas": [
				        {
				          "respuesta": "Saco al portero y se la paso a mi compañero. El equipo antes que la fama.",
				          "tipo": "p"
				        },
				        {
				          "respuesta": "Encaras y termino llevándome al portero por velocidad. Gol seguro",
				          "tipo": "x"
				        },
				        {
				          "respuesta": "Arrastro al portero por toda el área. Todos sabemos cómo va a acabar eso",
				          "tipo": "n"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/P3.png">',
				      "respuestas": [
				        {
				          "respuesta": "Entrené toda la semana para este momento. El gol olímpico cae seguro",
				          "tipo": "n"
				        },
				        {
				          "respuesta": "Pido el centro al punto penal. Llegó desde atrás para rematar. Qué bonito gol",
				          "tipo": "x"
				        },
				        {
				          "respuesta": "Voy a la segura y elijo una jugada que entrenamos en la semana. Ya vi el gol",
				          "tipo": "p"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/P4.png">',
				      "respuestas": [
				        {
				          "respuesta": "La coloco donde nadie, la barrera salta y el balón pasó justo abajo de ellos. Golazo",
				          "tipo": "n"
				        },
				        {
				          "respuesta": "Intento la jugada que practiqué con mis amigos. Esto acaba gol a nuestro favor",
				          "tipo": "p"
				        },
				        {
				          "respuesta": "¿Dudas? A la segura. Golazo al ángulo, arriba de la barrera. Comba perfecta",
				          "tipo": "x"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/P5.png">',
				      "respuestas": [
				        {
				          "respuesta": "Soy técnico. Me gusta hacer jugar a todo mi equipo",
				          "tipo": "p"
				        },
				        {
				          "respuesta": "La pelota al 10, siempre. Para eso me tienen",
				          "tipo": "n"
				        },
				        {
				          "respuesta": "Depende de la situación, en equipo o individual. No importa mientras ganemos",
				          "tipo": "x"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/P6.png">',
				      "respuestas": [
				        {
				          "respuesta": "Por su historia",
				          "tipo": "x"
				        },
				        {
				          "respuesta": "Por sus beneficios para mi juego",
				          "tipo": "p"
				        },
				        {
				          "respuesta": "Por el diseño",
				          "tipo": "n"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/P7.png">',
				      "respuestas": [
				        {
				          "respuesta": "Me gusta explotar mi velocidad. Ni el número me alcanzan a ver",
				          "tipo": "x"
				        },
				        {
				          "respuesta": "Soy el mejor del campo. Soy el primero al que escogen",
				          "tipo": "n"
				        },
				        {
				          "respuesta": "Me gusta pensar antes de pasar el balón. Diría que soy calculador",
				          "tipo": "p"
				        }
				      ]
				    },
				    {
				      "pregunta": '<img src="images/preguntas/P8.png">',
				      "respuestas": [
				        {
				          "respuesta": "El mejor de todos. Nadie sabe qué haré cuando tengo el balón",
				          "tipo": "n"
				        },
				        {
				          "respuesta": "Aseguro el gol. Ya sea con mi amigo o solo, busco anotar sin ser cremoso",
				          "tipo": "p"
				        },
				        {
				          "respuesta": "Siempre busco el gol pero si mi amigo tiene más chance, le dejo el balón. Hazte famoso",
				          "tipo": "x"
				        }
				      ]
				    }
				  ]
				};
		  preguntas=data.preguntas;
		 
		 $("#indepth_pregunta_cont").html("");
		 
		 $.each(preguntas, function( i, item ) {
			 
			var div='<div class="indepth_pregunta_item"><div class="indepth_pregunta">'+item.pregunta+
			'</div><div class="indepth_pregunta_main"><div class="indepth_pregunta_img" ele="a" num="'+(i+1)+'"><img src="'+urlIndepth+'images/preguntas/a_'+(i+1)+'_Gris.png"/></div>'+
			'<div class="indepth_pregunta_img" ele="b" num="'+(i+1)+'"><img src="'+urlIndepth+'images/preguntas/b_'+(i+1)+'_Gris.png"/></div><div class="indepth_pregunta_img" ele="c" num="'+(i+1)+'"><img src="'+urlIndepth+'images/preguntas/c_'+(i+1)+'_Gris.png"/></div><div class="indepth_respuestas_cont" num="'+i+'">';
				
			var div_items="";
			$.each(item.respuestas, function( j, items ) {
				if(j == 0){
					div_items+='<div class="indepth_respuesta_item active" num="'+j+'">'+items.respuesta+'</div>';
				}else{
					div_items+='<div class="indepth_respuesta_item active" num="'+j+'">'+items.respuesta+'</div>';
				}
				
			});						
										
			var div_fin='</div></div></div>';
			 
			$("#indepth_pregunta_cont").append(div+div_items+div_fin); 
		});
		 
		$("#indepth_page1").css({
			"top":ventana_alto-100,
			"visibility":"visible",
			"height": "auto"
		});
		
		$("#nav-bar-stats,#top-bar-wrapper,#body-wrapper").hide();
		
		$("#indepth_page1").show();
		
		$("#indepth_page1").animate({
			top: 0
		},2000); 
		var respuesta = new Array();
		
		$(document).on("click",".indepth_respuesta_item",function(){
				
			var respuesta_cont = $(this).parent();
			var pregunta_num = respuesta_cont.attr("num");
			var respuesta_num = $(this).attr("num");
			var pregunta_obj = preguntas[pregunta_num];
			var respuesta_obj = pregunta_obj.respuestas[respuesta_num];
			
			var num_resp = parseInt($(this).attr("num"));
			var elems = $(".indepth_respuesta_item", $(this).parent());
			var pos = elems.index(this);
			var ele = $($(this).parent().parent().find(".indepth_pregunta_img").get(pos)).attr("ele");
			var num = $($(this).parent().parent().find(".indepth_pregunta_img").get(pos)).attr("num");
			
			$(this).addClass("select");
			/*respuesta.push(respuesta_num);
			console.log(respuesta);*/
			var img_ele = $(this).parent().parent().find(".indepth_pregunta_img").get(num_resp);
			$(img_ele).children().attr("src", "images/preguntas/"+(ele)+"_"+(num)+".png")
			
			respuesta_cont.find('.indepth_respuesta_item').removeClass("active").addClass("disable");
			respuesta_cont.find('.indepth_respuesta_item').click(false);
			$(this).parent().parent().find(".indepth_pregunta_img").removeClass("active").addClass("disable");
			$(this).parent().parent().find(".indepth_pregunta_img").click(false);
				
			tipo = (respuesta_obj.tipo);
			
			if(tipo == "p"){
				respuesta.push(0);
				console.log(respuesta);
			}else if (tipo == "n"){
				respuesta.push(1);
				console.log(respuesta);
			}else if (tipo == "x"){
				respuesta.push(2);
				console.log(respuesta);
			}

			if(respuesta.length == preguntas.length){
				var total = countMaxValue(respuesta);
				console.log(total);
				window.setTimeout(function(){
					console.log("time");
					console.log(total);
					finish_test(total);
				});
			}
			return respuesta;
		});

		$(document).on("click",".indepth_pregunta_img",function(){

			var respuesta_cont = $(this).parent().find(".indepth_respuestas_cont");
			var pregunta_num = respuesta_cont.attr("num");
			//var respuesta_num = $(this).index(this);
			var pos = $(".indepth_pregunta_img", $(this).parent());
			var respuesta_num = pos.index(this);
			var pregunta_obj = preguntas[pregunta_num];
			var respuesta_obj = pregunta_obj.respuestas[respuesta_num];

			var ele = $(this).attr("ele");
			var num = parseInt($(this).attr("num"));
			
			$(this).next().addClass("select");
			/*respuesta.push(respuesta_num);
			console.log(respuesta);*/
			$(this).children().attr("src", "images/preguntas/"+(ele)+"_"+(num)+".png")
			
			$(this).parent().find(".indepth_respuestas_cont").children().removeClass("active").addClass("disable");
			$(this).parent().find(".indepth_respuestas_cont").children().click(false);
			$(this).parent().find(".indepth_pregunta_img").children().removeClass("active").addClass("disable");
			$(this).parent().find(".indepth_pregunta_img").children().click(false);
				
			tipo = (respuesta_obj.tipo);
			
			if(tipo == "p"){
				respuesta.push(0);
				console.log(respuesta);
			}else if (tipo == "n"){
				respuesta.push(1);
				console.log(respuesta);
			}else if (tipo == "x"){
				respuesta.push(2);
				console.log(respuesta);
			}

			if(respuesta.length == preguntas.length){
				var total = countMaxValue(respuesta);
				console.log(total);
				window.setTimeout(function(){
					console.log("time");
					console.log(total);
					finish_test(total);
				});
			}
			return respuesta;
		});
});

function finish_test(total){

	console.log("time2");
	console.log(total);
	
	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();;
	var ventana_ancho = $(window).width();
	var img = total;
	console.log(total);
	$("#indepth_resultados").css({"display": "table"});

	if (img == 0) {
		$("#indepth_resultados").css({
			"visibility": "visible",
			"position":"fixed",
			"top": 0,
			"left": -ventana_ancho,
			"background-image": "url("+urlIndepth+"images/respuestas/" + img + ".jpg)",
			"background-color": "#a81d1f"
		});
	} else if (img == 1) {
		$("#indepth_resultados").css({
			"visibility": "visible",
			"position":"fixed",
			"top": 0,
			"left": -ventana_ancho,
			"background-image": "url("+urlIndepth+"images/respuestas/" + img + ".jpg)",
			"background-color": "#a81d1f"
		});
	} else if (img == 2) {
		$("#indepth_resultados").css({
			"visibility": "visible",
			"position":"fixed",
			"top": 0,
			"left": -ventana_ancho,
			"background-image": "url("+urlIndepth+"images/respuestas/" + img + ".jpg)",
			"background-color": "#a81d1f"
		});
	}

	$("#indepth_resultados").animate({
	  	"left": 0
  	},2000, function(){
	  	$("html, body, #indepth_page1").css("overflow","hidden");
  	});

  	$("#indepth_twittear").click(function(){
  		var text = "";
		if (total == 0) {
			text = encodeURIComponent("!Eres un maestro del control! No lo esperaba. Te rifas tanto como Pogba");
		} else if (total == 1) {
			text = encodeURIComponent("Lo tuyo lo tuyo es hacer que lo imposible suceda. Messi te querría seguro en su equipo");
		} else {
			text = encodeURIComponent("¡Un Luis Suáres en su máxima potencia! Corres, luchas, recuperas y metes goles, nadie te detiene.");
		}
		
		var url = encodeURIComponent("http://juanfutbol.com/indepth/adidas-here");
		window.open("https://twitter.com/share?text="+text+"&hashtags=JFAdidas&url="+url,"","width=500, height=300");
	});

	$("#indepth_facebook").click(function(){
  		var text = "";
		if (total == 0) {
			text = encodeURIComponent("!Eres un maestro del control! No lo esperaba. Te rifas tanto como Pogba");
		} else if (total == 1) {
			text = encodeURIComponent("Lo tuyo lo tuyo es hacer que lo imposible suceda. Messi te querría seguro en su equipo");
		} else {
			text = encodeURIComponent("¡Un Luis Suáres en su máxima potencia! Corres, luchas, recuperas y metes goles, nadie te detiene.");
		}
		
		var url = encodeURIComponent("http://juanfutbol.com/indepth/adidas-here");
		window.open("https://www.facebook.com/sharer/sharer.php?text="+text+"&hashtags=JFAdidas&url="+url,"","width=500, height=300");
		//https://facebook.com/share?text=
	});
}

var indepth_sizeAdjust = function(firstTime){
	$(".indepth_page").each(function(){
		if($(this).attr("resize") == "true"){
			var h = parseInt($(this).width(),10) / $(this).attr("width") * $(this).attr("height");
			$(this).css("height", h + "px");
		}else if(firstTime && $(this).attr("resize") == "false"){
			$(".indepth_background", $(this)).css("min-width", $(this).attr("width") + "px");
			$(this).css("height", $(this).attr("height") + "px");
		}
	})
}

var indepth_preloadImgs = function(){
	$("img[over]").each(function(){
		$(this).attr("out", $(this).attr("src"));
		$(this).on("mouseenter", function(){
			$(this).attr("src", $(this).attr("over"));
		}).on("mouseleave", function(){
			$(this).attr("src", $(this).attr("out"));
		}).css("cursor", "pointer");

		var tmp = $("<img/>");
		tmp.attr("src", $(this).attr("over"));
		tmp.css({"position":"absolute", "top":"-9999px", "left":"-9999px"})
		tmp.appendTo("body");
	});
}

$(document).ready(function(){
	indepth_sizeAdjust(true);
	indepth_preloadImgs();
	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	ventana_ancho = $(window).width();
	
	$("#indepth_cover").css({
		"width": (ventana_ancho)+"px",
		"height": (ventana_alto-100)+"px"	
	});

	/*$("#indepth_resultados").css({
		"width":ventana_ancho+"px",
		"height":ventana_alto+"px"
	});*/
});
	
	$(document).on("click", "#indepth_button_ver" ,function(){
		$.fn.fullpage.moveSectionDown();
	});

$(window).on("resize", function(){

	ventana_alto = window.innerHeight ? window.innerHeight : $(window).height();
	ventana_ancho = $(window).width();

	$("#indepth_cover").css({
		"width": (ventana_ancho)+"px",
		"height": (ventana_alto-100)+"px"	
	})
		
	    /*$("#indepth_resultados").css({
			"width":ventana_ancho+"px",
			"height":ventana_alto+"px"
		});*/
});


