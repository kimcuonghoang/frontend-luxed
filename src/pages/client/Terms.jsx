const Terms = () => {
  return (
    <>
      <div className="min-h-screen bg-white px-6 md:px-20 py-16 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
            Điều Khoản & Điều Kiện
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            Khi sử dụng website{" "}
            <span className="font-semibold">LUXE Fashion</span>, bạn đồng ý tuân
            thủ các điều khoản và điều kiện dưới đây. Vui lòng đọc kỹ trước khi
            mua sắm hoặc đăng ký tài khoản.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              1. Tài khoản người dùng
            </h2>
            <p className="text-gray-600 leading-relaxed">
              - Bạn cần cung cấp thông tin chính xác khi đăng ký tài khoản.{" "}
              <br />
              - Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt
              động liên quan đến tài khoản của mình. <br />- LUXE Fashion có
              quyền tạm khóa hoặc hủy tài khoản nếu phát hiện vi phạm.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              2. Đặt hàng & Thanh toán
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                Mọi đơn hàng cần được xác nhận qua email hoặc số điện thoại.
              </li>
              <li>
                Khách hàng cần thanh toán theo phương thức được hỗ trợ trên
                website.
              </li>
              <li>
                Chúng tôi có quyền từ chối hoặc hủy đơn trong trường hợp gian
                lận hoặc vi phạm.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              3. Vận chuyển & Giao hàng
            </h2>
            <p className="text-gray-600 leading-relaxed">
              - Thời gian giao hàng phụ thuộc vào địa chỉ và phương thức vận
              chuyển. <br />- Chúng tôi không chịu trách nhiệm cho sự chậm trễ
              do nguyên nhân bất khả kháng (thiên tai, dịch bệnh, vận
              chuyển...).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              4. Đổi trả & Hoàn tiền
            </h2>
            <p className="text-gray-600 leading-relaxed">
              - Sản phẩm được phép đổi trả trong vòng 7 ngày kể từ khi nhận hàng
              nếu còn nguyên tem mác và chưa sử dụng. <br />
              - Các sản phẩm giảm giá hoặc đặt riêng theo yêu cầu không áp dụng
              chính sách đổi trả. <br />- Hoàn tiền sẽ được xử lý trong vòng 5-7
              ngày làm việc.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              5. Quyền sở hữu trí tuệ
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Toàn bộ nội dung, hình ảnh, logo, thiết kế và dữ liệu trên website
              thuộc quyền sở hữu của LUXE Fashion. Nghiêm cấm mọi hành vi sao
              chép, phân phối hoặc sử dụng trái phép mà không có sự cho phép
              bằng văn bản.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              6. Thay đổi điều khoản
            </h2>
            <p className="text-gray-600 leading-relaxed">
              LUXE Fashion có quyền điều chỉnh và cập nhật điều khoản bất kỳ lúc
              nào. Các thay đổi sẽ được công bố trên website và có hiệu lực ngay
              khi đăng tải.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Liên hệ</h2>
            <p className="text-gray-600 leading-relaxed">
              Nếu có thắc mắc về Điều khoản & Điều kiện, vui lòng liên hệ qua
              email:{" "}
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

export default Terms;
