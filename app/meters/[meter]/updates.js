export async function updateData(id){
    const res = fetch(`https://powerboardd.vercel.app/api/meters?id=${id}`)
    return (await res).json()
}