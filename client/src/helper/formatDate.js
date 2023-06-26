export default function formatDate(date){
    date = new Date(date)
    let year=date.getFullYear()
    let month= (date.getMonth()+1)<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1)
    let day= (date.getDate()+1)<10 ? "0"+(date.getDate()) : (date.getDate())
    return year+"-"+month+"-"+day
  
  }