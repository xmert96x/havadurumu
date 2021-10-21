loadXMLDoc("");


String.prototype.turkishToUpper = function() {
    var string = this;
    var letters = {
        "i": "İ",
        "ş": "Ş",
        "ğ": "Ğ",
        "ü": "Ü",
        "ö": "Ö",
        "ç": "Ç",
        "ı": "I"
    };
    string = string.replace(/(([iışğüçö]))/g, function(letter) {
        return letters[letter];
    })
    return string.toUpperCase();
}

function upadatetable(x) {
    var input = document.getElementById("key").value;


    if (input !== "" || x !== 0) {
        try {
            document.getElementsByTagName("table")[0].remove();
        } catch (error) {

        }
        loadXMLDoc(input);
    }
}

function start() {

    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);
    addrow();
    x += 1;
    return x;
}

function addrow() {
    var y = document.createElement("TR");
    y.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(y);
}

function loadXMLDoc(key) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xmlhttp.open("GET", "https://www.mgm.gov.tr/FTPDATA/analiz/sonSOA.xml", true);
    xmlhttp.send();
}

function bug(x, i, xml) {
    try {
        xmlDoc = xml.responseXML;
        y = xmlDoc.getElementsByTagName(x.toString());
        text = y[i].childNodes[0].nodeValue + " ";

        return text;
    } catch {
        return "";
    }
}

function alerttest(x) {
    alert(x);
}

function addcell(txt, type) {
    var z;
    if (type === "header") {
        z = document.createElement("TH");
        z.addEventListener("click", function() {
            alerttest(txt);
        });

    }
    if (type === undefined) {
        z = document.createElement("TD");
    }
    var t = document.createTextNode(txt);
    z.appendChild(t);
    document.getElementById("myTable").lastChild.appendChild(z);
}

var opti = 0;

function addheader(txt, i, xml) {
    var txt2 = bug(txt, i, xml);
    if (txt2 != "") {
        addcell(txt, 'header');
        var select = document.getElementById("filter");
        if (select.length >= 2) {
            if (opti == 0) {
                if (txt !== select[1].innerHTML) {
                    addoption(txt)
                    select.selectedIndex = "2";
                }
                if (txt === select[1].innerHTML) {
                    opti = 1;
                }
            }
        } else {
            addoption(txt)
        }
    }
}

function addoption(txt) {
    var select = document.getElementById("filter");
    var option = document.createElement("option");
    option.value = txt;
    var text = document.createTextNode(txt);
    option.appendChild(text);
    select.appendChild(option)
}


function myFunction(xml) {
    var filer = document.getElementById("filter");
    var key = document.getElementById("key").value;
    var x, i, xmlDoc, txt;
    xmlDoc = xml.responseXML;
    txt = "";

    x = xmlDoc.getElementsByTagName("Bolge");
    var cnt = 0;
    for (i = 0; i < x.length; i++) {


        if (typeof table == 'undefined') {
            var table = start();

        }
        if (i == 0) {
            addheader("Numara", i, xml);
            addheader("Bolge", i, xml);
            addheader("ili", i, xml);
            addheader("Durum", i, xml);
            addheader("Mak", i, xml);
            addheader("Min", i, xml);
            addheader("Peryot", i, xml);
            addrow();
            if (filer.selectedIndex > 0) {


                var selected = filer[filer.selectedIndex].innerHTML
            }
        }
        if (key == "") {
            txt = bug("Bolge", i, xml);
            addcell(txt);
            txt = bug("ili", i, xml);
            addcell(txt);
            txt = bug("Durum", i, xml);
            addcell(txt);
            txt = bug("Mak", i, xml);
            addcell(txt);
            txt = bug("Min", i, xml);
            addcell(txt);
            txt = bug("Peryot", i, xml);
            addcell(txt);
            if (i + 1 != x.length) addrow();
            cnt++;
        } else {

            txt = bug(selected.toString(), i, xml);

            if (txt.turkishToUpper().includes(key.turkishToUpper().trim())) {

                txt = bug("Bolge", i, xml);
                addcell(txt);
                txt = bug("ili", i, xml);
                addcell(txt);
                txt = bug("Durum", i, xml);
                addcell(txt);
                txt = bug("Mak", i, xml);
                addcell(txt);
                txt = bug("Min", i, xml);
                addcell(txt);
                txt = bug("Peryot", i, xml);
                addcell(txt);
                if (i + 1 != x.length) addrow();
                cnt++;
            }


        }

    }
    if (cnt == 0) {
        document.getElementsByTagName("table")[0].remove();
        var x = document.createElement("TABLE");
        x.setAttribute("id", "myTable");
        document.body.appendChild(x);
        addrow();
        addcell("Sonuç Bulunadı");


    } else {

    }

}