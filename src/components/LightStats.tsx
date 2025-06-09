export default function LightStats() {
  return (
    <div className="w-full h-[600px] relative flex items-center justify-center">
      {/* <div className="w-[666px] h-[212px] bg-white rounded-xl  flex flex-col justify-between text-center"> */}
      {/* Title */}
      <div>
        <h1
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "Playfair Display, serif" }} // Applied Playfair Display
        >
          Light of the Nation
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Col 1 */}
        <div>
          <h1 className="text-2xl font-bold text-primary">6M</h1>
          <p className="text-sm text-gray-600 mt-1">Beautiful People</p>
        </div>

        {/* Col 2 */}
        <div>
          <h1 className="text-2xl font-bold text-primary">No 1</h1>
          <p className="text-sm text-gray-600 mt-1">Economy in South East</p>
        </div>

        {/* Col 3 */}
        <div>
          <h1 className="text-2xl font-bold text-primary">₦200B</h1>
          <p className="text-sm text-gray-600 mt-1">Annual Revenue</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
