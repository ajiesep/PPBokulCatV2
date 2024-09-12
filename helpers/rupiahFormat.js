function rupiahFormat(value){
    let data = value.tolocaleString("id-ID", {style:"currency", currency:"IDR"})
    return data
}