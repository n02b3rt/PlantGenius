import sys
from PyQt5.QtWidgets import QMainWindow, QWidget, QGridLayout, QFrame, QApplication
from components.top_bar import TopBar
from components.left_panel import LeftPanel

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PlantGenius")
        self.setFixedSize(1024, 600)
        self.init_ui()

    def init_ui(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)

        grid_layout = QGridLayout()
        grid_layout.setContentsMargins(0, 0, 0, 0)
        grid_layout.setSpacing(0)

        self.top_bar = TopBar()
        grid_layout.addWidget(self.top_bar, 0, 0, 1, 2)

        left_frame = QFrame()
        left_frame.setObjectName("LeftFrame")
        left_frame.setStyleSheet("""
            QFrame#LeftFrame {
                background-color: #2ecc71;
            }
        """)
        left_layout = QGridLayout(left_frame)
        left_layout.setContentsMargins(0, 0, 0, 0)
        left_layout.setSpacing(0)

        self.left_panel = LeftPanel()
        left_layout.addWidget(self.left_panel)

        grid_layout.addWidget(left_frame, 1, 0)

        self.right_placeholder = QWidget()
        self.right_placeholder.setStyleSheet("background-color: white;")
        grid_layout.addWidget(self.right_placeholder, 1, 1)

        grid_layout.setColumnStretch(0, 1)
        grid_layout.setColumnStretch(1, 4)

        grid_layout.setRowStretch(0, 0)
        grid_layout.setRowStretch(1, 1)

        central_widget.setLayout(grid_layout)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
