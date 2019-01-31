const listOfMovies = [
    'Władca much (1990)',
    'Władca Pierścieni (1978)',
    'Milczenie owiec (1991)',
    'Moja dziewczyna (1991)',
    'Dziewczyna z tatuażem (2011)',
    'Jestem Bogiem (2011)',
    'Jestem legendą (2007)',
    'Matrix (1999)',
    'Zielona mila (1999)',
    '8 Mila (2002)',
    'Uciekająca panna młoda (1999)',
    'Gnijąca panna młoda (2005)',
    'Dzień świra (2002)',
    'Dzień Niepodległości (1996)',
    'Dzień świstaka (1993)',
    'Lista Schindlera (1993)',
    'Czarna lista Hollywood (1991)',
    'Lista klientów (2012)',
    'Teraz albo nigdy (2018)',
    'Niech będzie teraz (2012)',
    'Zabójcze maszyny (2018)',
    'Zabójcza broń (1987)',
    'Znaki (2002)',
    'Znaki na drodze (1969)',
    'Wodne znaki (2013)',
    'Znaki dymne (1998)',
    'Jeden dzień (2011)',
    'Dzień próby (2001)',
    'Dzień z życia blondynki (2014)',
    'Panna Nikt (1996)',
    'Panna Meadows (2014)',
    'Panna Nikt (2010)',
    'Panna Julia (1951)'
]



const TitlesList = function (list) {
    const titlesList = list.map(value => value.slice(0, -7));
    // console.log('titlesList =>', titlesList)
    return titlesList;
}
const PremiereYearList = function (list) {
    const premiereYearList = list.map(value => value.slice(-5, -1));
    // console.log('premiereYear =>', premiereYearList)
    return premiereYearList;
}

let titlesList = TitlesList(listOfMovies);
let premiereYearList = PremiereYearList(listOfMovies);

const listDisplay = document.getElementById('listDisplay');

function createTiles(tab1, tab2) {
    for (i = 0; i < tab1.length; i++) {
        const $divItem = document.createElement('div');
        const $h2Item = document.createElement('h2')
        const $h2ItemText = document.createTextNode(tab1[i]);

        const $h3Item = document.createElement('h3')
        const $h3ItemText = document.createTextNode(tab2[i]);
        $h3Item.appendChild($h3ItemText);
        $divItem.setAttribute("id", i + 1)
        $h2Item.appendChild($h2ItemText);
        $divItem.appendChild($h2Item);
        $divItem.appendChild($h3Item);
        listDisplay.appendChild($divItem);

        if ($divItem.id % 2 == 0) {
            $divItem.setAttribute("class", 'even')
        } else { $divItem.setAttribute("class", 'odd') }
    }

}

createTiles(titlesList, premiereYearList);

const $amountDisplay = document.getElementById('amountDisplay');

function amountDisplay(list) {
    const $pItem = document.createElement('p');
    const $pItemText = document.createTextNode(`Ilość pozycji na liście: ${list.length}`);
    $pItem.appendChild($pItemText);
    $amountDisplay.appendChild($pItem);
}

amountDisplay(listOfMovies)

const $switch = document.getElementById('switch');

$switch.onclick = function () {
    let tilesOdd = document.getElementsByClassName('odd');
    let tilesEven = document.getElementsByClassName('even');
    let tilesOddArray = Array.from(tilesOdd)
    let tilesEvenArray = Array.from(tilesEven)
    if ($switch.checked == true) {
        console.log('noc');
        document.body.classList.add("night");
        tilesOddArray.map(value => value.classList.add("odd-night"));
        tilesEvenArray.map(value => value.classList.add("even-night"));

    } else {
        console.log('dzień');
        document.body.classList.remove("night");
        tilesOddArray.map(value => value.classList.remove("odd-night"));
        tilesEvenArray.map(value => value.classList.remove("even-night"));
    }
}


document.forms.addingForm.onsubmit = function () {
    var title = this.title.value;
    var year = this.year.value;
    listOfMovies.push(`${title} (${year})`);

    // czyszczenie i aktualizacja kafelków
    clearElement(listDisplay)

    let titlesList = TitlesList(listOfMovies);
    let premiereYearList = PremiereYearList(listOfMovies);
    createTiles(titlesList, premiereYearList);

    //czyszczenie i aktualizacja liczby filmów
    clearElement($amountDisplay);
    amountDisplay(listOfMovies);

    //czyszczenie i aktualizacja tagów
    clearElement($tagsCloudDisplay);
    let titlesListSplit = TitlesListSplit(titlesList);
    creatingTagsCloud(titlesListSplit, listOfMovies);
    SearchByTag()

    // czyszczenie i aktualizacja wyszukiwania rokiem
    clearElement($yearSearchDisplay);
    creatingYearSelect(premiereYearList);
    SearchByYear();

    message();

    this.title.value = "";
    this.year.value = "";

    return false;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function message() {
    const $message = document.getElementById('message');
    $message.textContent = 'Dodano nowy film';

    setTimeout(function () {
        $message.style.opacity = '0';
    }, 1500);

    $message.style.opacity = "1";
    return false;
};

function TitlesListSplit(list) {
    const titlesListString = list.toString().toLowerCase()
    const titlesListSplit = titlesListString.split(/[\s,]+/);
    // console.log('titlesListSplit =>', titlesListSplit)
    return titlesListSplit;
}

let titlesListSplit = TitlesListSplit(titlesList);

const $tagsCloudDisplay = document.getElementById('tagsCloudDisplay');

function creatingTagsCloud(list) {
    const $tagsCloudDescript = document.createElement('h3');
    const $tagsCloudDescriptText = document.createTextNode('Wyszukaj film po tagu:');
    $tagsCloudDescript.appendChild($tagsCloudDescriptText);
    $tagsCloudDisplay.appendChild($tagsCloudDescript);
    var counts = {};
    list.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    i = 0

    const entries = Object.entries(counts)

    for (const [tag, count] of entries) {
        const $pItem = document.createElement('p');
        const $pItemText = document.createTextNode(tag);
        $pItem.appendChild($pItemText);
        $tagsCloudDisplay.appendChild($pItem);
        // $pItem.setAttribute('href', `#${tag}`);
        if (count == 1) {
            $pItem.setAttribute('class', 'small');
        } else if (count >= 2 && count < 5) {
            $pItem.setAttribute('class', 'large');
        } else ($pItem.setAttribute('class', 'big'))
    }

    const $pItem = document.createElement('p');
    const $pItemText = document.createTextNode('wszystkie');
    $pItem.appendChild($pItemText);
    $tagsCloudDisplay.appendChild($pItem);
    $pItem.setAttribute('class', 'all')


}

creatingTagsCloud(titlesListSplit, listOfMovies)

const $yearSearchDisplay = document.getElementById('yearSearchDisplay');

function creatingYearSelect(list) {
    const $yearSearchDescript = document.createElement('h3');
    const $yearSearchDescriptText = document.createTextNode('Wyszukaj film po roku premiery:');
    $yearSearchDescript.appendChild($yearSearchDescriptText);
    $yearSearchDisplay.appendChild($yearSearchDescript);

    const $selectList = document.createElement('select');
    $selectList.setAttribute('id', 'select')
    $yearSearchDisplay.appendChild($selectList);

    list.sort(function (a, b) { return a - b });
    list = removeDuplicates(list);

    for (var i = 0; i < list.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = list[i];
        option.value = list[i];

        $selectList.appendChild(option);
    }

    const $optionItem = document.createElement('option');
    const $optionItemText = document.createTextNode('----');
    $optionItem.appendChild($optionItemText);
    $optionItem.setAttribute('value', 'all');
    $optionItem.setAttribute('selected', 'selected');
    $selectList.prepend($optionItem);


}

function removeDuplicates(list) {
    let unique_list = []
    for (let i = 0; i < list.length; i++) {
        if (unique_list.indexOf(list[i]) == -1) {
            unique_list.push(list[i])
        }
    }
    return unique_list
}

creatingYearSelect(premiereYearList);


// Sortowanie wg. tagów
function SearchByTag() {
    let tags = document.querySelectorAll('#tagsCloudDisplay p');
    let tagAll = tags[tags.length - 1];
    tags.forEach(clicked);

    function clicked(tag) {
        let tagText = tag.innerHTML;
        // if (tagText.length <= 2) {
        //     tagText = tag.innerHTML + " ";
        // }
        tag.onclick = function () {
            // console.log(`Kliknięto ${tagText}`);
            const $tiles = Array.from(document.querySelectorAll('#listDisplay div'));
            $tiles.forEach($item => {
                const text = $item.querySelector('h2').textContent.toLowerCase();
                const arrayFromText = text.split(/[\s,]+/);

                if (arrayFromText.includes(tagText)) {
                    $item.classList.remove('hide')
                } else {
                    $item.classList.add('hide')
                }

            });
            tagAll.onclick = function () {
                const $tiles = Array.from(document.querySelectorAll('#listDisplay div'));
                $tiles.forEach($item => {
                    $item.classList.remove('hide');
                });
            }
        }
    }
}
SearchByTag();

// Sortowanie wg. roku premiery
function SearchByYear() {
    let years = document.querySelectorAll('option');
    let allYears = years[0];
    years.forEach(changed);

    function changed() {
        let select = document.getElementById('select');
        select.onchange = function () {
            let yearValue = this.value;
                    const $tiles = Array.from(document.querySelectorAll('#listDisplay div'));
                    $tiles.forEach($item => {
                        const tileYear = $item.querySelector('h3').textContent;
                        if (tileYear === yearValue) {
                            $item.classList.remove('hide')
                        } else {
                            $item.classList.add('hide')
                        }

                        if (yearValue == allYears.value) {
                            const $tiles = Array.from(document.querySelectorAll('#listDisplay div'));
                            $tiles.forEach($item => {
                                $item.classList.remove('hide');
                            });
                        }

                    });
        }
    }
}
SearchByYear();



