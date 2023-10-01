export function LoadingSpinner() {
  return (
    <div className="m-4 flex flex-col items-center rounded-sm border border-accent">
      <div className="flex items-center  ">
        <div className="h-24 w-24 border-b border-r border-accent p-8 text-primary">
          <svg
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_0s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.92713 10.8649C10.7283 7.4413 14.6016 4.9291 19.0346 3.84091C17.91 4.97643 16.9045 6.32064 16.0329 7.81386C14.1584 7.92708 12.5879 9.16675 11.9893 10.8649H7.92713ZM12.0629 14.1081C12.282 14.6493 12.6014 15.1391 12.998 15.5544C12.4852 17.7005 12.1666 20.0025 12.0665 22.3784H3.30565C3.53569 19.4015 4.3937 16.6007 5.74738 14.1081H12.0629ZM16.0039 16.9627C16.1062 16.9695 16.2095 16.973 16.3135 16.973C18.2372 16.973 19.8841 15.788 20.5641 14.1081H32.1054C32.7455 15.9304 33.2194 17.9325 33.4846 20.0747C32.4219 20.5134 31.5601 21.3402 31.076 22.3784H15.3129C15.3996 20.4934 15.6363 18.6712 16.0039 16.9627ZM35.2467 22.973L35.2264 22.973C34.4888 22.9762 33.8919 23.5752 33.8919 24.3135C33.8919 25.0539 34.4921 25.6541 35.2324 25.6541C35.9728 25.6541 36.573 25.0539 36.573 24.3135C36.573 23.5779 35.9805 22.9807 35.2467 22.973ZM35.5135 14.1081C36.0887 15.968 36.5036 17.9413 36.7394 19.9832C37.9125 20.3914 38.8687 21.2628 39.3889 22.3784H44.6943C44.4639 19.396 43.6031 16.5903 42.2451 14.0943C42.1755 14.1034 42.1045 14.1081 42.0324 14.1081H35.5135ZM36.6521 28.6732C38.0787 28.209 39.1982 27.0639 39.6269 25.6216H44.6943C44.4516 28.7632 43.5095 31.7087 42.0234 34.3027H35.3807C35.9588 32.5215 36.3884 30.6315 36.6521 28.6732ZM30.838 25.6216C31.2244 26.9216 32.172 27.9801 33.3999 28.5163C33.1018 30.5968 32.6063 32.5381 31.9535 34.3027H20.2416C19.6307 32.5559 17.9923 31.2916 16.0508 31.2345C15.6578 29.4677 15.4038 27.585 15.313 25.6216H30.838ZM12.9683 32.3037C12.4754 30.1988 12.1652 27.9553 12.0666 25.6216H3.30565C3.54842 28.7632 4.49054 31.7087 5.97656 34.3027H11.5855C11.8604 33.5167 12.3433 32.8283 12.9683 32.3037ZM11.6673 37.5459H8.27216C11.0392 40.7558 14.7722 43.1094 19.0197 44.1554C17.9488 43.0746 16.9855 41.8048 16.1422 40.3944C16.0664 40.3981 15.9902 40.4 15.9135 40.4C13.994 40.4 12.35 39.2201 11.6673 37.5459ZM19.1368 39.0753C20.5804 41.3812 22.2987 43.0365 24.1188 43.9456C26.548 42.835 28.7754 40.5993 30.4721 37.5459H20.1597C19.924 38.1241 19.5736 38.6433 19.1368 39.0753ZM20.6377 10.8649H30.696C28.9742 7.60788 26.6582 5.22391 24.1197 4.06134C22.3333 4.95113 20.6399 6.57273 19.2074 8.83421C19.8544 9.36153 20.3547 10.062 20.6377 10.8649ZM40.0729 10.8649H34.2968C33.0955 8.17632 31.5245 5.83726 29.6579 4.0237C33.8015 5.19498 37.4186 7.62076 40.0729 10.8649ZM34.1076 37.5459C32.9335 40.061 31.4304 42.2542 29.6619 43.9752C33.627 42.8535 37.1098 40.583 39.7278 37.5459H34.1076ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM14.973 12.3892C14.973 11.6488 15.5732 11.0486 16.3135 11.0486C17.0539 11.0486 17.6541 11.6488 17.6541 12.3892C17.6541 13.1295 17.0539 13.7297 16.3135 13.7297C15.5732 13.7297 14.973 13.1295 14.973 12.3892ZM14.573 35.8162C14.573 35.0759 15.1732 34.4757 15.9135 34.4757C16.6539 34.4757 17.2541 35.0759 17.2541 35.8162C17.2541 36.5566 16.6539 37.1568 15.9135 37.1568C15.1732 37.1568 14.573 36.5566 14.573 35.8162Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="h-24 w-24 border-b border-r border-accent p-8 text-primary">
          <svg
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_0.5s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M26.2251 4.78677C24.9182 4.00325 23.1497 4.01871 21.8572 4.8188C21.2833 5.17411 20.6658 5.72715 19.8217 6.5177C19.7473 6.58733 19.6716 6.65839 19.5945 6.73076C18.8325 7.44601 17.9349 8.28861 16.8744 9.12737C14.4997 11.0054 11.3108 12.867 6.55845 13.7721C4.42909 14.1844 3.36651 15.4803 3.36651 16.668V19.6317C3.36651 30.3187 7.10054 36.4096 11.2644 40.0185C15.4289 43.628 20.1797 44.9002 22.7375 45.5852C22.7804 45.5967 22.8228 45.608 22.8645 45.6192C23.6013 45.8148 24.3987 45.8148 25.1355 45.6192C25.1772 45.608 25.2195 45.5967 25.2625 45.5852C27.8203 44.9002 32.5711 43.628 36.7356 40.0185C40.8995 36.4096 44.6335 30.3187 44.6335 19.6317V16.6573C44.6335 15.3711 43.496 13.9881 41.5822 13.7808C41.5171 13.7737 41.4533 13.7629 41.391 13.7485C36.4532 13.1716 33.2813 11.2942 30.9697 9.30142C29.9716 8.44093 29.1333 7.55692 28.4279 6.81297C28.3276 6.70718 28.2299 6.60422 28.1349 6.50457C27.3279 5.65823 26.7602 5.1092 26.2251 4.78677ZM20.1616 2.0797C22.4768 0.646471 25.5398 0.618748 27.8837 2.0251L27.8859 2.02641C28.8486 2.60607 29.698 3.47568 30.4664 4.2815C30.5685 4.38857 30.6704 4.49597 30.7726 4.60362C31.4837 5.35279 32.2063 6.11413 33.0732 6.86147C34.9952 8.51842 37.624 10.0977 41.9303 10.5674C42.0008 10.5751 42.0698 10.5873 42.1371 10.6036C45.2838 11.037 47.8549 13.5026 47.8549 16.6573V19.6317C47.8549 31.1836 43.7662 38.188 38.8455 42.4529C34.1148 46.5531 28.7604 47.9846 26.1595 48.68C26.0942 48.6975 26.0306 48.7145 25.9688 48.7311L25.9657 48.7319C24.685 49.0725 23.315 49.0725 22.0343 48.7319L22.0312 48.7311C21.9694 48.7145 21.9058 48.6975 21.8405 48.68C19.2396 47.9846 13.8852 46.5531 9.15448 42.4529C4.23382 38.188 0.14505 31.1836 0.14505 19.6317V16.668C0.14505 13.3461 2.96895 11.1848 5.94943 10.6087L5.95388 10.6078L5.95388 10.6078C10.1131 9.81608 12.8349 8.21488 14.876 6.60062C15.8242 5.85073 16.6259 5.09858 17.3961 4.37593C17.4709 4.30578 17.5454 4.23591 17.6196 4.16635C18.4241 3.41295 19.2698 2.63176 20.1616 2.0797Z"
              fill="currentColor"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.7691 16.5713C21.5172 16.5713 19.7423 18.3573 19.7423 20.4831C19.7423 22.609 21.5172 24.3949 23.7691 24.3949C26.0228 24.3949 27.796 22.6165 27.796 20.4831C27.796 18.3498 26.0228 16.5713 23.7691 16.5713ZM16.5208 20.4831C16.5208 16.5158 19.801 13.3499 23.7691 13.3499C27.7355 13.3499 31.0174 16.5049 31.0174 20.4831C31.0174 22.907 29.7991 25.0252 27.95 26.3105C30.8793 27.7963 32.8966 30.7969 32.8966 34.2894C32.8966 35.179 32.1755 35.9001 31.2859 35.9001H16.2524C15.3628 35.9001 14.6416 35.179 14.6416 34.2894C14.6416 30.796 16.6599 27.7949 19.5904 26.3094C17.7397 25.0222 16.5208 22.9016 16.5208 20.4831ZM18.0984 32.6787H29.4399C28.7282 30.3004 26.4801 28.5368 23.7691 28.5368C21.0581 28.5368 18.81 30.3004 18.0984 32.6787Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="h-24 w-24 border-b border-accent p-8 text-primary">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_1s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.4876 3.72795C11.7376 3.29482 12.1997 3.02798 12.6998 3.02798H35.3002C35.8003 3.02798 36.2624 3.29482 36.5124 3.72795L47.8125 23.3049C48.0625 23.738 48.0625 24.2716 47.8124 24.7046L36.5122 44.2723C36.2622 44.7053 35.8002 44.972 35.3002 44.972H12.6998C12.1998 44.972 11.7378 44.7053 11.4878 44.2723L0.187597 24.7046C-0.0624807 24.2716 -0.0625357 23.738 0.187452 23.3049L11.4876 3.72795ZM13.508 5.82736L3.01591 24.0045L13.5079 42.1726H34.4921L44.9841 24.0045L34.492 5.82736H13.508Z"
              fill="currentColor"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.5413 14.5436C19.2108 14.1571 20.0668 14.3866 20.4533 15.0561L29.9712 31.5444C30.3576 32.2139 30.1282 33.0699 29.4587 33.4564C28.7892 33.8428 27.9332 33.6134 27.5467 32.9439L18.0288 16.4556C17.6424 15.7861 17.8718 14.9301 18.5413 14.5436Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-24 w-24 border-b border-r border-accent p-8 text-primary">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_0.5s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.64868 1.359C8.64868 0.608447 9.25713 0 10.0077 0H23.8913C24.4982 0 25.0123 0.39792 25.1867 0.947123L42.3411 36.0082H45.6571C46.4076 36.0082 47.0161 36.6166 47.0161 37.3672V46.6084C47.0161 47.3589 46.4076 47.9674 45.6571 47.9674H34.7089C34.3927 47.9674 34.1017 47.8594 33.8708 47.6782C33.691 47.5487 33.5439 47.3758 33.4447 47.173L16.2156 11.9592H10.0077C9.25713 11.9592 8.64868 11.3508 8.64868 10.6002V1.359ZM35.5294 45.2494H44.2981V38.7262H41.4931C40.9741 38.7262 40.5004 38.4306 40.2724 37.9644L23.0273 2.71801H11.3667V9.24122H17.0636C17.5826 9.24122 18.0563 9.53679 18.2844 10.003L35.5294 45.2494Z"
              fill="currentColor"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.6511 20.1241C15.1704 20.1245 15.6442 20.4209 15.8717 20.8878L21.5252 32.4882C21.7086 32.8646 21.7083 33.3046 21.5243 33.6807L14.8923 47.2382C14.6643 47.7044 14.1906 48 13.6716 48H2.34292C1.87402 48 1.43824 47.7583 1.19 47.3605C0.941752 46.9627 0.916112 46.465 1.12216 46.0438L13.4293 20.8859C13.6575 20.4194 14.1317 20.1237 14.6511 20.1241ZM4.52065 45.282H12.8235L18.7912 33.0825L14.6477 24.5805L4.52065 45.282Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="h-24 w-24 border-b border-r border-accent p-8 text-primary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            className="animate-[2.5s_ease-in-out_1s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </div>
        <div className="h-24 w-24 border-b border-accent p-8 text-primary">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_1.5s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              d="M35.2588 2.196C34.5376 1.78531 33.616 2.04575 33.2154 2.76695C32.8147 3.48815 33.0651 4.40969 33.7863 4.81036C40.6978 8.70685 44.995 16.0591 44.995 23.9823C44.995 31.9055 40.6778 39.2978 33.7362 43.1843C33.015 43.595 32.7546 44.5065 33.1553 45.2277C33.4357 45.7185 33.9466 45.999 34.4675 45.999C34.7179 45.999 34.9683 45.9389 35.1987 45.8087C43.0918 41.3813 48 33.0274 48 23.9823C48 14.9372 43.1119 6.63339 35.2588 2.196Z"
              fill="currentColor"
            ></path>
            <path
              d="M14.2337 43.1743C7.30217 39.2778 3.00501 31.9255 3.00501 23.9923C3.00501 16.0591 7.29215 8.72685 14.1937 4.83036C14.9149 4.41968 15.1753 3.50816 14.7646 2.78695C14.3539 2.06575 13.4424 1.80532 12.7212 2.216C4.87813 6.64338 0 14.9873 0 23.9923C0 32.9973 4.88815 41.3713 12.7613 45.7986C12.9917 45.9289 13.2521 45.989 13.4925 45.989C14.0134 45.989 14.5242 45.7085 14.8047 45.2277C15.2154 44.5065 14.9549 43.5849 14.2337 43.1843V43.1743Z"
              fill="currentColor"
            ></path>
            <path
              d="M39.5058 23.9923C39.5058 19.3446 37.4524 14.9873 33.8664 12.0324C33.2254 11.5015 32.2738 11.5917 31.7529 12.2327C31.222 12.8738 31.3122 13.8154 31.9532 14.3462C34.8481 16.7302 36.5008 20.2461 36.5008 23.9923C36.5008 27.7386 34.8581 31.2244 31.9933 33.6083C31.3522 34.1392 31.2721 35.0908 31.803 35.7219C32.1035 36.0825 32.5242 36.2628 32.9549 36.2628C33.2955 36.2628 33.636 36.1526 33.9165 35.9122C37.4724 32.9573 39.5158 28.61 39.5158 23.9823L39.5058 23.9923Z"
              fill="currentColor"
            ></path>
            <path
              d="M16.0267 14.3563C16.6678 13.8254 16.7579 12.8838 16.227 12.2427C15.6962 11.6017 14.7546 11.5115 14.1135 12.0424C10.5476 14.9973 8.49416 19.3546 8.49416 23.9823C8.49416 28.61 10.5275 32.9372 14.0634 35.8922C14.3439 36.1225 14.6845 36.2427 15.025 36.2427C15.4558 36.2427 15.8865 36.0624 16.177 35.7018C16.7078 35.0608 16.6277 34.1192 15.9866 33.5883C13.1319 31.2044 11.4891 27.7085 11.4891 23.9923C11.4891 20.2761 13.1419 16.7503 16.0167 14.3663L16.0267 14.3563Z"
              fill="currentColor"
            ></path>
            <path
              d="M24 17.6718C20.5142 17.6718 17.6895 20.5065 17.6895 23.9823C17.6895 27.4581 20.5242 30.2928 24 30.2928C27.4758 30.2928 30.3105 27.4581 30.3105 23.9823C30.3105 20.5065 27.4758 17.6718 24 17.6718ZM24 27.2978C22.177 27.2978 20.6945 25.8154 20.6945 23.9923C20.6945 22.1693 22.177 20.6868 24 20.6868C25.823 20.6868 27.3055 22.1693 27.3055 23.9923C27.3055 25.8154 25.823 27.2978 24 27.2978Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-24 w-24 border-r border-accent p-8 text-primary">
          <svg
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_1s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M26.0259 1.39149L46.5274 9.22716C47.1995 9.46269 47.6387 9.9059 47.8402 10.1092L47.8738 10.143C47.9491 10.2183 48.0168 10.3009 48.0758 10.3895C48.2983 10.7232 48.8298 11.5754 48.6708 12.6236V37.4817C48.6708 38.818 47.9011 40.1379 46.5327 40.6171L25.8666 48.6898C25.6791 48.7631 25.4796 48.8006 25.2783 48.8006H24.0925C23.8937 48.8006 23.6965 48.764 23.511 48.6925L2.81348 40.7153C2.7653 40.6967 2.71804 40.6759 2.67186 40.6528C1.61273 40.1232 0.700012 39.0946 0.700012 37.5895V12.3644C0.700012 11.4301 1.16481 10.742 1.36913 10.4395L1.3715 10.436C1.65579 9.95821 2.07216 9.71339 2.2459 9.61688C2.3633 9.55165 2.474 9.50014 2.54305 9.46842L2.61459 9.43568L2.61468 9.43564L2.6149 9.43553C2.64552 9.42157 2.65758 9.41606 2.67186 9.40892C2.71804 9.38583 2.7653 9.36497 2.81348 9.3464L23.4503 1.39261C24.2866 1.00197 25.1895 1.0016 26.0259 1.39149ZM24.7393 4.36004C24.7178 4.36945 24.696 4.37839 24.674 4.38685L4.03876 12.34C4.01977 12.349 4.0022 12.3572 3.98668 12.3643L3.97107 12.3715L3.96893 12.375C3.95314 12.4007 3.94192 12.4203 3.934 12.4349V37.5895C3.934 37.6066 3.93521 37.6178 3.93612 37.624L3.93734 37.6306L3.93758 37.6316L3.93815 37.6324C3.94192 37.6378 3.97258 37.6783 4.06556 37.732L24.3933 45.5667H24.9737L45.3875 37.5925C45.3982 37.5883 45.4089 37.5843 45.4197 37.5803C45.4272 37.5626 45.4368 37.5304 45.4368 37.4817V12.4722C45.4368 12.4122 45.4402 12.3523 45.4468 12.2927C45.4391 12.2856 45.4324 12.2796 45.4265 12.2745L45.4141 12.2637L45.3985 12.2578L24.8088 4.38848C24.7854 4.37954 24.7623 4.37005 24.7393 4.36004ZM24.7393 16.1374C20.036 16.1374 16.2231 19.9502 16.2231 24.6535C16.2231 29.3569 20.036 33.1697 24.7393 33.1697C29.4427 33.1697 33.2555 29.3569 33.2555 24.6535C33.2555 19.9502 29.4427 16.1374 24.7393 16.1374ZM12.9892 24.6535C12.9892 18.1641 18.2499 12.9034 24.7393 12.9034C31.2287 12.9034 36.4895 18.1641 36.4895 24.6535C36.4895 31.143 31.2287 36.4037 24.7393 36.4037C18.2499 36.4037 12.9892 31.143 12.9892 24.6535ZM26.6797 19.9104C26.6797 19.0173 25.9557 18.2934 25.0627 18.2934C24.1697 18.2934 23.4457 19.0173 23.4457 19.9104V24.6535C23.4457 25.0938 23.6253 25.5151 23.9429 25.82L26.6379 28.4072C27.2821 29.0257 28.3057 29.0048 28.9242 28.3606C29.5426 27.7163 29.5217 26.6927 28.8775 26.0743L26.6797 23.9644V19.9104Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="h-24 w-24 border-r border-accent p-8 text-primary">
          <svg
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_1.5s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.38092 6.76442C4.38087 6.76442 4.38158 6.76351 4.38316 6.76168C4.38175 6.76351 4.38096 6.76442 4.38092 6.76442ZM4.9194 6.39638C5.01978 6.34311 5.13557 6.2862 5.26845 6.22637C6.2155 5.80002 7.68649 5.37655 9.62928 5.00662C13.4885 4.27178 18.8883 3.80683 24.9 3.80683C30.9117 3.80683 36.3115 4.27178 40.1707 5.00662C42.1135 5.37655 43.5845 5.80002 44.5315 6.22637C44.6644 6.2862 44.7802 6.34311 44.8806 6.39638C44.7802 6.44965 44.6644 6.50657 44.5315 6.56639C43.5845 6.99274 42.1135 7.41621 40.1707 7.78615C36.3115 8.52099 30.9117 8.98594 24.9 8.98594C18.8883 8.98594 13.4885 8.52099 9.62928 7.78615C7.68649 7.41621 6.2155 6.99274 5.26845 6.56639C5.13557 6.50657 5.01978 6.44965 4.9194 6.39638ZM45.4191 6.76442C45.419 6.76442 45.4183 6.76354 45.4169 6.76175C45.4184 6.76353 45.4191 6.76442 45.4191 6.76442ZM45.4168 6.03108C45.4182 6.02926 45.419 6.02835 45.4191 6.02834C45.4191 6.02834 45.4184 6.02925 45.4168 6.03108ZM4.38316 6.03108C4.38158 6.02926 4.38088 6.02834 4.38092 6.02834C4.38096 6.02834 4.38175 6.02926 4.38316 6.03108ZM9.02943 1.85639C13.14 1.07368 18.7502 0.6 24.9 0.6C31.0498 0.6 36.66 1.07368 40.7706 1.85639C42.8127 2.24524 44.5665 2.72528 45.848 3.30221C46.4836 3.58834 47.0919 3.93714 47.5651 4.37753C48.0369 4.81655 48.5236 5.4938 48.5236 6.39638C48.5236 7.29897 48.0369 7.97621 47.5651 8.41523C47.0919 8.85562 46.4836 9.20443 45.848 9.49056C44.5665 10.0675 42.8127 10.5475 40.7706 10.9364C36.66 11.7191 31.0498 12.1928 24.9 12.1928C18.7502 12.1928 13.14 11.7191 9.02943 10.9364C6.98734 10.5475 5.23354 10.0675 3.95202 9.49056C3.31644 9.20443 2.70814 8.85562 2.23487 8.41523C1.76307 7.97621 1.27637 7.29897 1.27637 6.39638C1.27637 5.4938 1.76307 4.81655 2.23487 4.37753C2.70814 3.93714 3.31644 3.58834 3.95202 3.30221C5.23354 2.72528 6.98734 2.24524 9.02943 1.85639Z"
              fill="currentColor"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M47.1198 11.8619C47.9219 11.9625 48.5236 12.6445 48.5236 13.4528C48.5236 13.8075 48.4492 14.128 48.33 14.4136L39.9224 47.3927C39.7413 48.103 39.1016 48.6 38.3686 48.6H11.4313C10.6983 48.6 10.0586 48.1029 9.87754 47.3926L1.4329 14.2579C1.23044 13.4635 1.65981 12.6443 2.42828 12.3589C3.18356 12.0783 4.02729 12.4021 4.40283 13.11C4.41853 13.1267 4.48309 13.194 4.64496 13.3001C4.89453 13.4636 5.27712 13.6551 5.81756 13.8584C6.89667 14.2642 8.42087 14.6492 10.3284 14.9793C14.1309 15.6373 19.2471 16.0424 24.9 16.0424C30.926 16.0424 36.3259 15.5863 40.1814 14.856C42.1225 14.4883 43.5892 14.0662 44.5322 13.6395C44.96 13.4459 45.2089 13.2826 45.3363 13.175L45.3665 13.0567C45.5662 12.2734 46.3177 11.7613 47.1198 11.8619ZM44.3258 17.1389C43.2965 17.4684 42.0973 17.7569 40.7782 18.0068C36.6701 18.7849 31.0599 19.2492 24.9 19.2492C19.1152 19.2492 13.8091 18.8361 9.78161 18.1391C8.14587 17.8561 6.68586 17.5203 5.47483 17.1324L12.6773 45.3932H37.1227L44.3258 17.1389Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="h-24 w-24 p-8 text-primary">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[2.5s_ease-in-out_2s_infinite_normal_none_running_pulse] opacity-10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.09125 8.47634C5.09125 8.2446 5.23065 7.7644 6.08419 7.09173C6.91935 6.43355 8.22886 5.76953 9.99234 5.18171C13.5022 4.01174 18.4548 3.26013 24 3.26013C29.5452 3.26013 34.4978 4.01174 38.0077 5.18171C39.7712 5.76953 41.0807 6.43355 41.9158 7.09173C42.7694 7.7644 42.9088 8.2446 42.9088 8.47634M46.1689 8.47634C46.1689 6.81754 45.1589 5.49668 43.9338 4.53119C42.6903 3.55122 40.9919 2.73999 39.0386 2.08888C35.1149 0.780981 29.7981 0 24 0C18.2019 0 12.8851 0.780981 8.96139 2.08888C7.00807 2.73999 5.30974 3.55122 4.06626 4.53119C2.84115 5.49668 1.83112 6.81754 1.83112 8.47634V18.8218V29.1782V39.5237C1.83112 41.1824 2.84078 42.5033 4.06586 43.469C5.30923 44.4491 7.00742 45.2603 8.96065 45.9114C12.8841 47.2192 18.201 48 24 48C29.799 48 35.1159 47.2192 39.0394 45.9114C40.9926 45.2603 42.6908 44.4491 43.9342 43.469C45.1592 42.5033 46.1689 41.1824 46.1689 39.5237M42.9088 39.5237C42.9088 39.7558 42.7692 40.2361 41.916 40.9086C41.081 41.5668 39.7717 42.2308 38.0084 42.8185C34.4988 43.9884 29.5463 44.7399 24 44.7399C18.4538 44.7399 13.5012 43.9884 9.9916 42.8185C8.22827 42.2308 6.919 41.5668 6.08403 40.9086C5.23078 40.2361 5.09125 39.7558 5.09125 39.5237V33.8336C6.18288 34.503 7.50051 35.0792 8.96065 35.5659C12.8841 36.8737 18.201 37.6545 24 37.6545C29.799 37.6545 35.1159 36.8737 39.0394 35.5659C40.4995 35.0792 41.8171 34.503 42.9088 33.8336L42.9088 39.5237ZM46.1689 29.1883C46.1689 29.1849 46.1689 29.1815 46.1689 29.1782C46.1689 29.176 46.1689 29.1739 46.1689 29.1717V18.8319C46.1689 18.8285 46.1689 18.8252 46.1689 18.8218C46.1689 18.8197 46.1689 18.8175 46.1689 18.8154V8.48642C46.1689 8.48306 46.1689 8.4797 46.1689 8.47634M42.9088 18.8256V13.1312C41.8169 13.8007 40.4991 14.377 39.0386 14.8638C35.1149 16.1717 29.7981 16.9527 24 16.9527C18.2019 16.9527 12.8851 16.1717 8.96139 14.8638C7.50096 14.377 6.18307 13.8007 5.09125 13.1312V18.8218C5.09125 19.058 5.23234 19.5396 6.08442 20.2117C6.91901 20.87 8.22785 21.5335 9.99109 22.1206C13.5005 23.2891 18.4531 24.038 24 24.038C29.5463 24.038 34.4988 23.2866 38.0084 22.1167C39.7717 21.5289 41.081 20.865 41.916 20.2068C42.7646 19.5379 42.9072 19.0592 42.9088 18.8256ZM42.9088 23.4773V29.182C42.9072 29.4155 42.7646 29.8942 41.916 30.5632C41.081 31.2213 39.7717 31.8853 38.0084 32.4731C34.4988 33.6429 29.5463 34.3944 24 34.3944C18.4538 34.3944 13.5012 33.6429 9.9916 32.4731C8.22827 31.8853 6.919 31.2213 6.08403 30.5632C5.23078 29.8906 5.09125 29.4103 5.09125 29.1782V23.4821C6.18315 24.1517 7.50099 24.7276 8.96116 25.2138C12.8848 26.5202 18.2016 27.2982 24 27.2982C29.799 27.2982 35.1159 26.5174 39.0394 25.2095C40.4995 24.7228 41.8171 24.1466 42.9088 23.4773ZM42.9088 8.48014C42.9072 8.71331 42.7647 9.19194 41.9158 9.86095C41.0807 10.5191 39.7712 11.1832 38.0077 11.771C34.4978 12.9409 29.5452 13.6926 24 13.6926C18.4548 13.6926 13.5022 12.9409 9.99234 11.771C8.22886 11.1832 6.91935 10.5191 6.08419 9.86095C5.23065 9.18829 5.09125 8.70808 5.09125 8.47634"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
