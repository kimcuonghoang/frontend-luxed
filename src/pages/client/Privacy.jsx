const Privacy = () => {
  return (
    <>
      <div className="min-h-screen bg-white px-6 md:px-20 py-16 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
            Chính Sách Bảo Mật
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            Tại <span className="font-semibold">LUXE Fashion</span>, chúng tôi
            cam kết bảo mật thông tin cá nhân của khách hàng. Chính sách này
            giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu mà bạn
            cung cấp.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              1. Thông tin thu thập
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi có thể thu thập các thông tin cá nhân như: tên, email,
              số điện thoại, địa chỉ giao hàng và thông tin thanh toán khi bạn
              đặt hàng hoặc đăng ký tài khoản trên website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Mục đích sử dụng</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Xử lý và giao hàng cho đơn đặt hàng của bạn.</li>
              <li>Liên hệ để xác nhận, chăm sóc khách hàng hoặc hỗ trợ.</li>
              <li>
                Gửi email về chương trình khuyến mãi và sản phẩm mới (nếu bạn
                đồng ý).
              </li>
              <li>Cải thiện trải nghiệm mua sắm trên website.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              3. Bảo mật thông tin
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Chúng tôi áp dụng các biện pháp kỹ thuật và quản lý cần thiết để
              bảo vệ dữ liệu cá nhân khỏi việc truy cập, sử dụng hoặc tiết lộ
              trái phép. Thông tin khách hàng sẽ không được chia sẻ cho bên thứ
              ba trừ khi có sự đồng ý từ bạn hoặc khi pháp luật yêu cầu.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              4. Quyền của khách hàng
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của
              mình bất cứ lúc nào bằng cách liên hệ với bộ phận hỗ trợ khách
              hàng của chúng tôi.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Liên hệ</h2>
            <p className="text-gray-600 leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi nào liên quan đến Chính sách bảo mật
              này, vui lòng liên hệ với chúng tôi qua email:{" "}
              <a
                href="mailto:support@luxefashion.com"
                className="text-black font-medium hover:underline"
              >
                support@luxefashion.com
              </a>
            </p>
          </section>

          <p className="text-sm text-gray-500 text-center mt-12">
            © {new Date().getFullYear()} LUXE Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
