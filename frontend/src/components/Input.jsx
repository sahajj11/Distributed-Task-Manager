const Input = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
    <input 
      {...props}
      className="w-full bg-[#1c1f26] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
    />
  </div>
);

export default Input