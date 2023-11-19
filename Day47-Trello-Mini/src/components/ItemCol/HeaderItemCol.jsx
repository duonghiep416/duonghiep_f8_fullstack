// eslint-disable-next-line react/prop-types
function HeaderItemCol({ header, style }) {
  return (
    <div
      className='w-full py-4 pl-5 bg-smoky-gray text-xl font-bold'
      style={style}
    >
      {header}
    </div>
  )
}
export default HeaderItemCol
