export async function updateData(id){
    const res = fetch(`http://localhost:3000/api/meters?id=${id}`)
    return (await res).json()
}