import React, { memo, useState } from "react";
import {
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel, Modal } from "antd";
import emailjs from "emailjs-com";

const CustomArrow = ({ onClick, direction }) => (
  <div
    onClick={onClick}
    style={{
      color: "black",
      fontSize: "24px",
      cursor: "pointer",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [direction === "prev" ? "left" : "right"]: "10px",
      zIndex: 1,
    }}
  >
    {direction === "prev" ? <LeftOutlined /> : <RightOutlined />}
  </div>
);

function Home() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const jobDescriptions1 = {
    Dealer: {
      title: "Dealer",
      titleVietnamese: "Nhân viên chia bài",
      quantity: 5,
      location: "Đà Nẵng",
      deadline: "1/10/2024",
      summary: [
        "- The Dealer is responsible for operating table games efficiently and maintaining a high level of professionalism. The role involves managing poker games, providing excellent customer service, and maintaining the integrity of the game. ",
        "- Người chia bài chịu trách nhiệm điều hành trò chơi trên bàn một cách hiệu quả và duy trì mức độ chuyên nghiệp cao. Vai trò này bao gồm quản lý trò chơi poker, cung cấp dịch vụ khách hàng tuyệt vời và duy trì tính toàn vẹn của trò chơi.",
      ],
      responsibilities: [
        "- Operate poker games, including dealing cards, managing bets, and collecting chips.",
        "Điều hành trò chơi poker, bao gồm chia bài, quản lý tiền cược và thu thập chia.",
        "- Ensure compliance with all company policies.",
        "Đảm bảo tuân thủ mọi chính sách của công ty.",
        "- Provide excellent customer service, including explaining rules and resolving disputes.",
        "Cung cấp dịch vụ khách hàng tuyệt vời, bao gồm giải thích các quy tắc và giải quyết tranh chấp.",
        "- Maintain a professional and friendly demeanor at all times.",
        "Luôn giữ thái độ chuyên nghiệp và thân thiện.",
        "- Monitor the game to ensure a fair and honest playing environment.",
        "Theo dõi trò chơi để đảm bảo môi trường chơi công bằng và trung thực.",
        "- Report any suspicious activity or discrepancies to the Dealer Captain or Floor Supervisor.",
        "Báo cáo bất kỳ hoạt động đáng ngờ hoặc bất thường nào cho Trưởng Dealer hoặc Giám sát tầng.",
        "- Assist in training new dealers as required.",
        "Hỗ trợ đào tạo dealer mới khi cần thiết.",
        "- Perform other duties as assigned by the Dealer Captain or Floor Supervisor.",
        "Thực hiện các nhiệm vụ khác được giao bởi Trưởng Dealer hoặc Giám sát tầng.",
      ],
    },
    Security: {
      title: "Security Office",
      titleVietnamese: "Nhân viên an ninh",
      quantity: 2,
      location: "Đà Nẵng",
      deadline: "2/10/2024",
      summary: [
        "1. Giám sát và bảo vệ/ Surveillance and Protection",
        "Theo dõi và giám sát các khu vực được phân công để đảm bảo an ninh.",
        "Monitor and supervise assigned areas to ensure security.",
        "Phát hiện và ngăn chặn các hành vi vi phạm an ninh.",
        "Detect and prevent security violations.",
        "2. Thực hiện kiểm tra an ninh/ Conduct Security Checks",
        "Thực hiện kiểm tra định kỳ các khu vực, thiết bị và hệ thống an ninh.",
        "Perform regular checks on areas, equipment, and security systems.",
        "Đảm bảo tất cả các cửa ra vào và lối thoát đều được khóa và an toàn.",
        "Ensure all doors and exits are locked and secure.",
        "3. Xử lý tình huống khẩn cấp/ Emergency Response",
        "Phản ứng nhanh chóng trong các tình huống khẩn cấp như hỏa hoạn, đột nhập hoặc tai nạn.",
        "Respond promptly to emergencies such as fires, break-ins, or accidents.",
        "Thực hiện các biện pháp an toàn theo quy trình đã được quy định.",
        "Follow established safety procedures.",
        "4. Hỗ trợ khách hàng/ Customer Assistance",
        "Cung cấp thông tin và hỗ trợ cho khách hàng và nhân viên khi cần thiết.",
        "Provide information and assistance to customers and staff as needed.",
        "Giải quyết các vấn đề liên quan đến an ninh hoặc đỗ xe.",
        "Address issues related to security or parking.",
        "5. Báo cáo và ghi chép/ Reporting and Documentation",
        "Lập báo cáo về các sự cố, vi phạm an ninh và hoạt động hàng ngày",
        "Prepare reports on incidents, security violations, and daily activities.",
        "Ghi chép và lưu trữ thông tin một cách chính xác.",
        "Record and maintain information accurately.",
        "6. Tham gia đào tạo/ Training Participation",
        "Tham gia các buổi đào tạo và tập huấn để nâng cao kỹ năng.",
        "Participate in training sessions to enhance skills.",
        "Học hỏi và áp dụng các quy trình an ninh mới.",
        "Learn and implement new security procedures.",
        "7. Đảm bảo an toàn cho tài sản/ Asset Protection",
        "Giám sát và bảo vệ tài sản của tổ chức.",
        "Monitor and protect the organization's assets.",
        "Thực hiện các biện pháp phòng ngừa để giảm thiểu rủi ro.",
        "Implement preventive measures to minimize risks.",
      ],
      responsibilities: [],
    },
    CageSupervisor: {
      title: "Cage Supervisor",
      titleVietnamese: "Giám sát thu ngân",
      quantity: 1,
      location: "Đà Nẵng",
      deadline: "3/10/2024",
      summary: [
        "- Provide a brief summary of the job role and its purpose.",
        "Cung cấp một bản tóm tắt ngắn gọn về vai trò công việc và mục đích của vị trí yêu cầu.",
        "- Inspection all the transaction.",
        "Kiểm tra giao dịch của thu ngân.",
        "Making report.",
        "Làm báo cáo.",
        "- Supervison and control all the subject in the cage.",
        "Kiểm tra và quản lý tất cả những vấn đề phát sinh của bộ phận thu ngân.",
      ],
      responsibilities: [],
    },
  };
  const jobDescriptions2 = {
    VIPHost: {
      title: "VIP HOST",
      titleVietnamese: "Lễ tân VIP",
      quantity: 2,
      location: "Đà Nẵng",
      deadline: "31/10/2024",
      summary: [],
      responsibilities: [
        "- Greet and assist VIP guests upon arrival, ensuring a warm and professionally welcome.",
        "Chào đón và hỗ trợ khách VIP khi đến, đảm bảo sự chào đón nồng nhiệt và chuyên nghiệp.",
        " Build and maintain strong relationships with VIP guests, understanding their preferences and needs.",
        "Xây dựng và duy trì mối quan hệ bền chặt với khách VIP, hiểu rõ sở thích và nhu cầu của họ.",
        "- Coordinate special requests, reservations, and services for VIP guests, including accommodations, transportation, and dining.",
        "Phối hợp các yêu cầu đặc biệt, đặt chỗ và dịch vụ cho khách VIP, bao gồm chỗ ở, phương tiện đi lại và ăn uống.",
        "- Monitor the gaming activities of VIP guests to ensure their needs are met and provide personalised service.",
        "Theo dõi hoạt động chơi game của khách VIP để đảm bảo đáp ứng nhu cầu của họ và cung cấp dịch vụ cá nhân hóa.",
        "- Handle any guest complaints or issues, ensuring they are resolved quickly and satisfactorily.",
        "Xử lý mọi khiếu nại hoặc vấn đề của khách, đảm bảo chúng được giải quyết nhanh chóng và thỏa đáng.",
        "- Work closely with other departments, including the gaming, hospitality, and security teams, to ensure a seamless VIP experience.",
        "Làm việc chặt chẽ với các phòng ban khác, bao gồm nhóm trò chơi, dịch vụ khách sạn và an ninh, để đảm bảo trải nghiệm VIP liền mạch.",
        "- Maintain up-to-date records of VIP guests’ preferences, special occasions, and gaming activity.",
        "Duy trì hồ sơ cập nhật về sở thích của khách VIP, những dịp đặc biệt và hoạt động chơi game.",
        "- Report any suspicious activities or concerns to the VIP Services Manager or Department Head.",
        "Báo cáo bất kỳ hoạt động hoặc mối lo ngại đáng ngờ nào cho Trưởng phòng hoặc Quản lý dịch vụ VIP.",
        "- Perform other duties as assigned by the Floor Supervisor or Department Head.",
        "Thực hiện các nhiệm vụ khác theo sự phân công của Giám sát tầng hoặc Trưởng phòng.",
      ],
    },
    OperationManager: {
      title: "Operation Manager",
      titleVietnamese: "Quản lí vận hành",
      quantity: 1,
      location: "Đà Nẵng",
      deadline: "31/10/2024",
      summary: [],
      responsibilities: [
        "- Manage day-to-day operations of the poker room, including supervising floor staff, dealers, and support staff.",
        "Quản lý hoạt động hàng ngày của phòng chơi poker, bao gồm giám sát nhân viên sàn, người chia bài và nhân viên hỗ trợ.",
        "- Ensure that all poker games are conducted fairly and according to established rules.",
        "Đảm bảo rằng tất cả các trò chơi poker được tiến hành công bằng và theo các quy tắc đã thiết lập.",
        "- Develop and implement operational policies and procedures to enhance efficiency and customer satisfaction.",
        "Xây dựng và thực hiện các chính sách và quy trình hoạt động để nâng cao hiệu quả và sự hài lòng của khách hàng.",
        "- Manage the recruitment, training, and performance evaluation of staff, ensuring high standards are maintained.",
        "Quản lý việc tuyển dụng, đào tạo và đánh giá hiệu suất của nhân viên, đảm bảo duy trì các tiêu chuẩn cao.",
        "- Handle escalated customer issues and disputes, ensuring they are resolved effectively.",
        "Xử lý các vấn đề và tranh chấp của khách hàng, đảm bảo chúng được giải quyết hiệu quả.",
        "- Ensure the poker room maintains a clean, safe, and welcoming environment for guests and staff.",
        "Đảm bảo phòng chơi poker luôn sạch sẽ, an toàn và thân thiện với khách và nhân viên.",
        "- Perform other duties as assigned by the Department Head.",
        "Thực hiện các nhiệm vụ khác theo sự phân công của Quản Lí Tổng.",
      ],
    },
    FloorSupervisor: {
      title: "Floor Supervisor",
      titleVietnamese: " Giám sát tầng",
      quantity: 3,
      location: "Đà Nẵng",
      deadline: "31/10/2024",
      summary: [],
      responsibilities: [
        "- Supervise the daily operations of the poker room, ensuring that all games are conducted fairly and according to the club’s rules and regulations.",
        "Giám sát hoạt động hàng ngày của phòng chơi poker, đảm bảo mọi trò chơi đều được tiến hành công bằng và theo đúng quy định của câu lạc bộ.",
        "- Monitor dealer performance and provide coaching and feedback as needed.",
        "Theo dõi hiệu suất của dealer và cung cấp hướng dẫn và phản hồi khi cần thiết.",
        "- Handle customer disputes and resolve issues in a professional manner.",
        "Xử lý tranh chấp của khách hàng và giải quyết vấn đề một cách chuyên nghiệp.",
        "- Ensure compliance with all company policies.",
        "Đảm bảo tuân thủ mọi chính sách của công ty.",
        "- Report any suspicious activities or potential cheating to the Poker Operations Manager or Department Head.",
        "Báo cáo bất kỳ hoạt động đáng ngờ hoặc gian lận tiềm ẩn nào cho Trưởng phòng hoặc Quản lý điều hành Poker.",
        "- Assist in training and developing new dealers and floor staff.",
        "Hỗ trợ đào tạo và phát triển dealer và nhân viên mới.",
        "- Ensure the poker room is maintained in a clean and organised manner.",
        "Đảm bảo phòng chơi poker được duy trì sạch sẽ và ngăn nắp.",
        "- Prepare and submit reports on daily operations, including any incidents or discrepancies.",
        "Chuẩn bị và nộp báo cáo về hoạt động hàng ngày, bao gồm mọi sự cố hoặc bất thường.",
        "- Manage shifts and ensure proper staffing levels are maintained.",
        "Quản lý ca làm việc và đảm bảo duy trì đủ nhân sự.",
        "- Perform other duties as assigned by the Poker Operations Manager or Department Head.",
        "Thực hiện các nhiệm vụ khác theo sự phân công của Trưởng phòng hoặc Giám đốc điều hành Poker.",
      ],
    },
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    phone: "",
    email: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_xt1ukxm",
        "template_8curkzp",
        formData,
        "U524ZmbDzXYKJJxCG"
      )
      .then((response) => {
        console.log("Email gửi thành công!", response.status, response.text);
        setFormData({
          name: "",
          birthdate: "",
          phone: "",
          email: "",
          position: "",
        });
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      })
      .catch((err) => {
        console.error("Có lỗi xảy ra trong khi gửi email", err);
      });
  };

  return (
    <>
      <div className="relative">
        <img
          src="/img/background.jpg"
          className="w-full h-[calc(100vh-150px)] object-cover"
          alt="Background"
        />
        <div className="flex flex-wrap absolute top-[70%] left-1/2 transform -translate-x-1/2 border border-white bg-white rounded-lg max-w-7xl w-full p-4">
          {[
            { img: "/img/aboutus.png", title: "ABOUT US", id: "about-us" },
            { img: "/img/section.jpg", title: "SECTION", id: "section" },
            {
              img: "/img/recruitment.png",
              title: "RECRUITMENT",
              id: "recruitment",
            },
            { img: "/img/news.png", title: "NEWS", id: "news" },
          ].map(({ img, title, id }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-5 flex-1 mx-2 transition-transform transform hover:scale-125 hover:bg-purplelight hover:text-white rounded-lg p-4"
            >
              <div className="flex flex-col items-center mb-4">
                <img src={img} className="w-10 h-10 opacity-80" alt={title} />
                <span className="text-lg font-bold mt-2">{title}</span>
              </div>
              <button
                className="rounded-full font-bold text-white border-none bg-yellow px-7"
                onClick={() => {
                  const target = document.getElementById(id);
                  if (target) {
                    const targetPosition =
                      target.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth",
                    });
                  } else {
                    console.error(`Element with id "${id}" not found.`);
                  }
                }}
              >
                FINDING
              </button>
            </div>
          ))}
        </div>
      </div>
      <div id="about-us" className="py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-3/4">
              <div className="bg-white p-4 shadow-lg">
                <img
                  src="/img/TRED-1.jpg"
                  alt="Poker event at Da Nang"
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-4 shadow-lg transform translate-y-10">
                <img
                  src="/img/TRED-2.jpg"
                  alt="Poker players at a table"
                  className="w-full h-auto "
                />
              </div>
              <div className="bg-white p-4 shadow-lg">
                <img
                  src="/img/TRED-3.jpg"
                  alt="Dream Poker logo with a person"
                  className="w-full h-auto"
                />
                <p className="text-center font-bold mt-2">
                  You have the power to determine your income
                </p>
              </div>
              <div className="bg-white p-4 shadow-lg transform translate-y-10">
                <img
                  src="/img/TRED-4.jpg"
                  alt="Poker tables in a room"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:w-3/4 w-full md:pl-8 mt-20 md:mt-2">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mr-20">
                  VISION
                </h1>
                <h2 className="text-2xl font-bold text-gray-600 mt-2 ml-20">
                  & MISSION
                </h2>
              </div>
              <div className="container mt-4">
                <p className="text-justify leading-normal text-gray">
                  Dream Poker Da Nang Club aims to create a healthy and
                  professional playing environment for all poker enthusiasts. We
                  offer world-class tournament structures, a top-notch
                  restaurant, premium gaming tables, and an elegant atmosphere
                  to provide an unparalleled experience for all players. Our
                  goal is to bring the intellectual game of poker closer to
                  players in Vietnam and create a platform for international
                  players.
                </p>
                <p className="text-justify leading-normal text-gray mt-4">
                  With our Slogan 'Nothing is impossible', we are committed to
                  pushing the boundaries of poker entertainment. Our mission is
                  to deliver unprecedented experiences that align with global
                  trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="section"
        className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-2xl"
      >
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-2/3">
              <h1>
                <span className="text-4xl font-bold text-blue-800 block">
                  HUMAN
                </span>
                <span className="text-5xl font-bold text-blue-600 block ml-24">
                  POLICY
                </span>
              </h1>
              <div className="flex items-center mt-4">
                <div className="flex-shrink-0">
                  <div className="border border-gray rounded-full p-1">
                    <div className="w-12 h-12 bg-yellow text-white flex items-center justify-center rounded-full text-xl font-bold">
                      01
                    </div>
                  </div>
                </div>
                <h3 className="ml-4 text-2xl font-bold">
                  TRAINING AND DEVELOPMENT
                </h3>
              </div>
              <p className="mt-4 text-gray text-justify">
                To help employees continuously develop themselves and maximize
                their potential, Dream Poker Da Nang Club always prioritizes
                training and professional development.
              </p>
              <p className="mt-2 text-gray text-justify">
                Nhằm giúp các nhân sự ngày càng phát triển bản thân, phát huy
                tối đa các tiềm năng của bản thân. Công ty luôn chú trọng đến
                vấn đề đào tạo và nâng cao nghiệp vụ cho nhân sự.
              </p>
            </div>
            <div className="md:w-1/3 mt-12 md:mt-0 md:ml-6 flex-shrink-0 relative">
              <img
                src="/img/TRED-4.jpg"
                alt="People playing poker at a table"
                className="rounded-lg shadow-lg transform translate-x-5 -translate-y-8"
              />
              <img
                src="/img/TRED-5.jpg"
                alt="Poker table with cards and chips"
                className="absolute top-0 right-0 transform -translate-x-1 -translate-y-2 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 bg-darkblue text-white p-6 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-shrink-0"></div>
            <div className="mr-4">
              <img
                src="/img/TRED-3.jpg"
                alt="Working environment at Dream Poker Da Nang"
                className="rounded-lg shadow-lg w-96"
              />
            </div>
            <div className="border border-white rounded-full p-1 mt-10 ml-5">
              <div className="w-12 h-12 bg-yellow text-white flex items-center justify-center rounded-full text-xl font-bold">
                02
              </div>
            </div>
            <div className="ml-4 flex-grow mt-10">
              <h2 className="text-xl font-bold">Working environment</h2>
              <ul className="mt-2 space-y-2">
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Collaboration - Innovation - Youthful energy - Dynamism
                </li>
                <li className="ml-6">
                  Chia sẻ - Hợp tác - Trẻ trung - Năng động
                </li>
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  High potential for career growth
                </li>
                <li className="ml-6"> Cơ hội thăng tiến cao trong công việc</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-darkblue text-white p-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex-shrink-0">
                <div className="border border-white rounded-full p-1">
                  <div className="w-12 h-12 bg-yellow text-white flex items-center justify-center rounded-full text-xl font-bold">
                    03
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-grow">
              <h2 className="text-xl font-bold">BENEFITS</h2>
              <ul className="mt-2 space-y-2 text-justify">
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  <li>Excellent career advancement opportunities</li>
                </div>
                <li className="ml-6">Cơ hội thăng tiến cao trong công việc</li>
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2 mb-5" />
                  <li>
                    Employees are eligible for salary increases based on their
                    performance and the company's performance.
                  </li>
                </div>
                <li className="ml-6">
                  Chế độ nâng lương: được xem xét và thỏa thuận điểm đánh giá
                  nhân viên theo quy định của Công ty.
                </li>
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2 mb-5" />
                  <li>
                    Employees are enrolled in social insurance, health
                    insurance, and unemployment insurance in accordance with the
                    Labor Code.
                  </li>
                </div>
                <li className="ml-6">
                  Tham gia BHXH, BHYT, BHTN theo Luật Lao động
                </li>
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  <li>
                    Attractive benefits package including performance-based
                    bonuses.
                  </li>
                </div>
                <li className="ml-6">
                  Các chế độ phúc lợi: Thưởng, các chế độ phúc lợi khác theo quy
                  định công ty
                </li>
              </ul>
            </div>
            <div className="ml-4 mt-10">
              <img
                src="/img/TRED-6.jpg"
                alt="Benefits at Dream Poker Da Nang"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600">
            ĐẾN VỚI NHAU LÀ MỘT SỰ KHỞI ĐẦU
          </h2>
          <p className="mt-2 text-gray">
            LÀM VIỆC VỚI NHAU LÀ SỰ TIẾN BỘ. GIỮ ĐƯỢC CHÂN NHAU LÀ THÀNH CÔNG.
          </p>
          <p className="mt-2 text-gray">
            COLLABORATION IS THE FOUNDATION, TEAMWORK IS THE JOURNEY, AND
            SUSTAINED SUCCESS IS THE DESTINATION.
          </p>
        </div>
      </div>
      <div id="recruitment" className="container mx-auto p-4">
        <div className="overflow-hidden">
          <h1 className="text-4xl mb-10 font-bold whitespace-nowrap animate-slide text-center">
            VỊ TRÍ ĐANG TUYỂN DỤNG
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="w-1/3">
            <Carousel
              autoplay
              arrows
              prevArrow={<CustomArrow direction="prev" />}
              nextArrow={<CustomArrow direction="next" />}
              dots={false}
            >
              {Object.keys(jobDescriptions1).map((key) => (
                <div key={key} className="rounded-lg shadow-md">
                  <div className="bg-gradient-to-b from-purple to-purplelight text-center border-b">
                    <h3 className="text-3xl font-bold text-white">
                      {jobDescriptions1[key].title}
                    </h3>
                    <p className="text-2xl font-medium text-white">
                      {key === "Dealer"
                        ? "Nhân viên chia bài"
                        : key === "Security"
                        ? "Nhân viên an ninh"
                        : "Giám sát thu ngân"}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 px-10">
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Số
                      lượng:
                      <span className="ml-2">
                        {jobDescriptions1[key].quantity}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Địa điểm
                      làm việc:
                      <span className="ml-2">
                        {jobDescriptions1[key].location}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Hạn nộp
                      hồ sơ:
                      <span className="ml-2">
                        {jobDescriptions1[key].deadline}
                      </span>
                    </li>
                  </ul>

                  <button
                    className="my-4 py-2 px-4 ml-10 rounded-full border"
                    onClick={() => handleJobClick(jobDescriptions1[key])}
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="w-1/3">
          <Carousel
              autoplay
              arrows
              prevArrow={<CustomArrow direction="prev" />}
              nextArrow={<CustomArrow direction="next" />}
              dots={false}
            >
              {Object.keys(jobDescriptions2).map((key) => (
                <div key={key} className="rounded-lg shadow-md">
                  <div className="bg-gradient-to-b from-purple to-purplelight text-center border-b">
                    <h3 className="text-3xl font-bold text-white">
                      {jobDescriptions2[key].title}
                    </h3>
                    <p className="text-2xl font-medium text-white">
                      {key === "Dealer"
                        ? "Nhân viên chia bài"
                        : key === "Security"
                        ? "Nhân viên an ninh"
                        : "Giám sát thu ngân"}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 px-10">
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Số
                      lượng:
                      <span className="ml-2">
                        {jobDescriptions2[key].quantity}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Địa điểm
                      làm việc:
                      <span className="ml-2">
                        {jobDescriptions2[key].location}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Hạn nộp
                      hồ sơ:
                      <span className="ml-2">
                        {jobDescriptions2[key].deadline}
                      </span>
                    </li>
                  </ul>

                  <button
                    className="my-4 py-2 px-4 ml-10 rounded-full border"
                    onClick={() => handleJobClick(jobDescriptions2[key])}
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </Carousel>
            <div>
              <Modal
                title={null}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleOk}
                footer={null}
                width={800}
                bodyStyle={{
                  backgroundColor: "#5166c7",
                  maxHeight: "600px",
                  overflowY: "auto",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="text-center text-white bg-yellow"
                  style={{
                    width: "50%",
                    margin: "0 auto",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    padding: "16px 0",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-3xl">{selectedJob?.title}</div>
                    <div className="text-xl">
                      {selectedJob?.titleVietnamese}
                    </div>
                  </div>
                </div>

                {selectedJob && (
                  <div className="mt-4">
                    {selectedJob.summary && selectedJob.summary.length > 0 && (
                      <>
                        <h4 className="font-semibold">
                          <u className="text-yellow ml-5 text-xl">
                            Job Summary: Tóm tắt công việc
                          </u>
                        </h4>
                        <ul className="list-none pl-5 mt-2">
                          {selectedJob.summary.map((item, index) => (
                            <li
                              className="text-white text-justify mx-5 leading-relaxed"
                              key={index}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {selectedJob.responsibilities &&
                      selectedJob.responsibilities.length > 0 && (
                        <>
                          <h4 className="font-semibold">
                            <u className="text-yellow ml-5 text-xl">
                              Key Responsibilities: Trách nhiệm chính
                            </u>
                          </h4>
                          <ul className="list-none pl-5 mt-2">
                            {selectedJob.responsibilities.map((item, index) => (
                              <li
                                className="text-white text-justify mx-5 leading-relaxed"
                                key={index}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-20">
          <div className="bg-darkblue md:w-9/12 w-auto p-8 rounded-lg shadow-lg flex">
            <div className="w-full md:w-1/3 rounded-lg transform -translate-y-20 bg-purple p-8">
              <h2 className="text-white text-3xl font-bold mb-4 text-center ">
                ỨNG TUYỂN ONLINE:
              </h2>
              <p className="text-white mb-4">
                Yêu cầu ứng viên điền đúng và đủ thông tin theo mẫu:
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Họ và tên"
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  placeholder="Ngày tháng năm sinh"
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  placeholder="Số điện thoại"
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                />
                <select
                  name="position"
                  value={formData.position}
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                >
                  <option value="">Vị trí ứng tuyển</option>
                  <option>Dealer - Nhân viên chia bài</option>
                  <option>Security Office</option>
                  <option>Cage Supervisor - Giám sát thu ngân</option>
                  <option>VIP HOST - Lễ tân HOST</option>
                  <option>Operation Manager - Quản lí vận hành</option>
                  <option>Floor Supervisor - Giám sát tầng</option>
                </select>
                <button
                  type="submit"
                  className="w-full p-2 bg-yellow text-white"
                >
                  GỬI
                </button>
              </form>
              {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded shadow-md text-center">
                    <p className="text-green-500 text-lg">
                      Email đã được gửi thành công!
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 ml-5">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-yellow">HƯỚNG DẪN</span>
                <br />
                <span className="text-white ml-20">NỘP HỒ SƠ</span>
              </h2>
              <p className="text-yellow mb-4">
                Ứng viên có thể chọn 01 trong 03 hình thức nộp đơn ứng tuyển
                sau:
              </p>
              <ul className="text-white space-y-2">
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Nộp trực tiếp hồ sơ xin việc tại văn phòng công ty. Hồ sơ bao
                  gồm:
                </li>
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Nộp CV ứng tuyển qua địa chỉ email: hr@dreampokerdanang.com
                </li>
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Điền vào mẫu ứng tuyển online đính kèm tại đây:
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Home);
