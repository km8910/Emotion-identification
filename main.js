prediction1=""
prediction2=""
Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    image_quality:90
})
camera=document.getElementById("camera");
Webcam.attach(camera)

function take_snapshot (){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+" >"
    })
}
console.log(ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/bzcoHZIPi/model.json",modelLoaded)

function modelLoaded(){
    console.log("modelloaded")
}
function speak(){
    var synth =window.speechSynthesis;
    speak_data1="first prediction is "+prediction1
    speak_data2="and second prediction is "+prediction2
    var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utter_this)
}
function check (){
    img = document.getElementById("captured_image")
    classifier.classify(img,gotresult)
}
function gotresult (error,result){
    if (error){
        console.error(error)
    }else{
        console.log(result)
        prediction1=result[0].label
        prediction2=result[1].label
        document.getElementById("result_emotion_name").innerHTML=prediction1
        document.getElementById("result_emotion_name2").innerHTML=prediction2
        speak ()
        if(prediction1=="Suprised"){
            document.getElementById("update_emoji").innerHTML="&#128512;"
        }
        if(prediction1=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;"
        }
        if(prediction1=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;"
        }
        if(prediction1=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;"
        }
        if(prediction2=="Suprised"){
            document.getElementById("update_emoji2").innerHTML="&#128512;"
        }
        if(prediction2=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;"
        }
        if(prediction2=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;"
        }
        if(prediction2=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;"
        }
    }
}