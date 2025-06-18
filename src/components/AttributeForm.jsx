// src/components/AttributeForm.jsx
export default function AttributeForm({ initialData, onSubmit }) {
  const [value, setValue] = useState(initialData?.value || "");

  const handleSubmit = () => {
    onSubmit({ value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Lưu</button>
    </form>
  );
}
