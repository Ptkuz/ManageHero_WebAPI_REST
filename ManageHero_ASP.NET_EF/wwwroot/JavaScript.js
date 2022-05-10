async function getHeroes() {
    const response = await fetch("/api/heroes", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const heroes = await response.json();
        const rows = document.querySelector("tbody");
        heroes.forEach(hero => rows.append(row(hero)));
    }

}

async function getHero(id) {
    const response = await fetch("/api/heroes/" + id,
        {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
    if (response.ok === true) {
        const hero = await response.json();
        const form = document.forms["heroForm"];
        form.elements["id"].value = hero.id;
        form.elements["alias"].value = hero.alias;
        form.elements["name"].value = hero.name;
        form.elements["publishhouse"].value = hero.publishHouse;

    }
    else {
        const error = await response.json();
        console.log(error.message);

    }
}

async function createHero(heroAlias, heroName, heroPublishHouse) {

    const response = await fetch("api/heroes", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            alias: heroAlias,
            name: heroName,
            publishhouse: heroPublishHouse
        })
    });
    if (response.ok === true) {
        const hero = await response.json();
        reset();
        document.querySelector("tbody").append(row(hero));
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}

async function editHero(heroId, heroAlias, heroName, heroPublishHouse) {
    const response = await fetch("api/heroes",
        {
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: heroId,
                alias: heroAlias,
                name: heroName,
                publishhouse: heroPublishHouse
            })

        });
    if (response.ok === true) {
        const hero = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + hero.id + "']").replaceWith(row(hero));
    }
    else {
        const error = await response.json();
        console.log(error.message);

    }

}

// Удаление пользователя
async function deleteHero(id) {
    const response = await fetch("/api/heroes/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const hero = await response.json();
        document.querySelector("tr[data-rowid='" + hero.id + "']").remove();
    }
    else {
        const error = await response.json();
        console.log(error.message);
    }
}


// сброс данных формы после отправки
function reset() {
    const form = document.forms["heroForm"];
    form.reset();
    form.elements["id"].value = 0;
}

// создание строки для таблицы
function row(hero) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", hero.id);

    const aliasTd = document.createElement("td");
    aliasTd.append(hero.alias);
    tr.append(aliasTd);

    const nameTd = document.createElement("td");
    nameTd.append(hero.name);
    tr.append(nameTd);

    const publishHouseTd = document.createElement("td");
    publishHouseTd.append(hero.publishHouse);
    tr.append(publishHouseTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getHero(hero.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteHero(hero.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}


// сброс значений формы
document.getElementById("reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

// отправка формы
document.forms["heroForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["heroForm"];
    const id = form.elements["id"].value;
    const alias = form.elements["alias"].value;
    const name = form.elements["name"].value;
    const publishhouse = form.elements["publishhouse"].value;
    if (id == 0)
        createHero(alias, name, publishhouse);
    else
        editHero(id, alias, name, publishhouse);
});

// загрузка пользователей
getHeroes();
