from PyQt5.QtWidgets import QWidget, QPushButton, QVBoxLayout, QHBoxLayout, QSizePolicy, QFrame

class TopBar(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)

        self.setFixedHeight(40)

        main_layout = QVBoxLayout()
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        bar_layout = QHBoxLayout()
        bar_layout.setContentsMargins(12, 0, 12, 0)
        bar_layout.setSpacing(0)

        self.button = QPushButton("☰ Widok")
        self.button.setStyleSheet("""
            QPushButton {
                background-color: #f3f3f3;
                color: #222;
                font-weight: bold;
                font-size: 16px;
                border: none;
                text-align: left;
            }
        """)
        self.button.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)

        bar_layout.addWidget(self.button)

        top_bar_container = QWidget()
        top_bar_container.setLayout(bar_layout)
        top_bar_container.setStyleSheet("background-color: #f3f3f3;")

        shadow = QFrame()
        shadow.setFixedHeight(6)
        shadow.setStyleSheet("""
            background: qlineargradient(
                x1:0, y1:0, x2:0, y2:1,
                stop:0 rgba(0, 0, 0, 40),
                stop:1 rgba(0, 0, 0, 0)
            );
        """)

        main_layout.addWidget(top_bar_container)
        main_layout.addWidget(shadow)
        self.setLayout(main_layout)
