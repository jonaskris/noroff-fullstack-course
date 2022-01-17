function submit(){
    var a = document.getElementById("input_two_pointers").value;
    var b = document.getElementById("input_three_pointers").value;
    var c = parseInt(a) * 2 + parseInt(b) * 3; 

    document.getElementById("output_sum").innerHTML=c;
}