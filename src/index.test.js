const arrayUtils=require('./index.js')
const leftArray=[
    {id:1, val:5},{id:2, val:6},{id:3, val:7},
]
const rightArray=[{id:2, val:6, another:4}]

it('correctly turns array into keys', ()=>{
    const arr=["one", "two", "three"]
    const expected={one:true, two:true, three:true}
    expect(arrayUtils.convertArrayToObj(arr)).toEqual(expected)
})
it('returns empty object when provided empty array', ()=>{
    const arr=[]
    const expected={}
    expect(arrayUtils.convertArrayToObj(arr)).toEqual(expected)
})

it('correctly returns true when array has length greater than zero', ()=>{
    const arr=["one", "two", "three"]
    expect(arrayUtils.hasLengthGreaterThanZero(arr)).toEqual(true)
})
it('correctly returns false when array has length zero', ()=>{
    const arr=[]
    expect(arrayUtils.hasLengthGreaterThanZero(arr)).toEqual(false)
})

it('returns all matches', () => {
    const comb=arrayUtils.leftjoin(leftArray, rightArray, (left, right)=>left.id===right.id);
    expect(comb).toEqual([{id:1, val:5},{id:2, val:6, another:4},{id:3, val:7},])
});

it('returns only matches', () => {
    const comb=arrayUtils.innerjoin(leftArray, rightArray, (left, right)=>left.id===right.id);
    expect(comb).toEqual([{id:2, val:6}])
});

it('returns unique array without last 1', ()=>{
    const arr=[1, 2, 3, 1]
    const expectedResult=[1, 2, 3]
    expect(arrayUtils.getUniqueArray(arr)).toEqual(expectedResult);
})
it('returns unique array with only 1', ()=>{
    const arr=[1, 1, 1, 1]
    const expectedResult=[1]
    expect(arrayUtils.getUniqueArray(arr)).toEqual(expectedResult);
})
it("returns obj from array", ()=>{
    const expected={1:{id:1, val:5}, 2:{id:2, val:6}, 3:{id:3, val:7}}
    expect(arrayUtils.convertArrayToObjByKey(leftArray, "id")).toEqual(expected)
})
it("returns left join when all match in outer join", ()=>{
    const expected=[{id:1, val:5},{another:4, id:2, val:6},{id:3, val:7}]
    expect(arrayUtils.outerjoin(leftArray, rightArray, "id", "id")).toEqual(expected)
})
it("returns all results from both array when each contains items not in the other", ()=>{
    const rightArray=[{id:2, val:6}, {id:10, val:8}]
    const expected=[{id:1, val:5},{id:2, val:6},{id:3, val:7}, {id:10, val:8}]
    expect(arrayUtils.outerjoin(leftArray, rightArray, "id", "id")).toEqual(expected)
})