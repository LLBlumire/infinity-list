let left = new Select('left');
let right = new Select('right');
let unseen = new Select('unseen');

let ordered = []

function displaylist() {
  document.body.innerHTML = "";
  for (index in ordered) {
    document.body.innerHTML += `
      <div class="list mcu${ordered[index]}">
        ${(index | 0) + 1}: ${movie_list[ordered[index]]}
      </div>
    `;
  }
}

function insertFrom(idx) {
  if (ordered.length > 1 && ordered.includes(0)) {
    ordered.splice(ordered.indexOf(0), 1);
  }
  console.log(`insertFrom(${idx})`)
  if (idx >= movie_list.length) {
    displaylist()
  }
  if (ordered.length === 0) {
    ordered.push(idx);
    insertFrom(idx + 1);
    return;
  }
  closeIndex(0, ordered.length, idx)
}

function closeIndex(min, max, idx) {
  console.log(`closeIndex(${max}, ${min}, ${idx}) on [${ordered}]`)
  if (max - min === 0) {
    ordered.splice(max, 0, idx)
    insertFrom(idx + 1)
    return
  }
  let partition = ~~((max + min) / 2)
  left.setMcu(idx);
  right.setMcu(ordered[partition]);
  unseen.element.innerText = `I Haven't Seen ${movie_list[idx]}`
  unseen.setCallback(() => {
    insertFrom(idx + 1)
  })
  left.setCallback(() => {
    closeIndex(min, partition, idx);
  })
  if (ordered[partition] !== 0) {
    right.setCallback(() => {
      closeIndex(partition + 1, max, idx);
    })
  }
}

insertFrom(0)