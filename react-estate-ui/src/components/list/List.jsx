import './list.scss'
import Card from"../card/Card"

function List({listData}){
  if(listData){
    if(listData[0].post){
      listData = listData.map(item=>item.post)
    }
  }
  return (
    <div className='list'>
      {listData.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List