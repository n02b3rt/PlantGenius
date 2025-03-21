from PyQt5.QtWidgets import QWidget, QLabel, QVBoxLayout, QFrame
from PyQt5.QtGui import QFont, QPixmap
from PyQt5.QtCore import Qt


class LeftPanel(QWidget):
    def __init__(self):
        super().__init__()
        self.setStyleSheet("background-color: #2ecc71;")
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignTop | Qt.AlignHCenter)

        title = QLabel("PLANTGENIUS")
        title.setFont(QFont("Arial", 15, QFont.Bold))
        title.setAlignment(Qt.AlignCenter)
        title.setStyleSheet("color: white; margin: 10px; text-align: center;")
        layout.addWidget(title)

        subtitle = QLabel("Dane środowiskowe")
        subtitle.setFont(QFont("Arial", 12, QFont.Bold))
        subtitle.setAlignment(Qt.AlignCenter)
        subtitle.setStyleSheet("color: white; margin: 10px; text-align: center;")
        layout.addWidget(subtitle)

        # Boxy środowiskowe
        layout.addWidget(self._create_info_box("assets/icons/sun.png", "Procent: 98%", "Wartość: 20302"), alignment=Qt.AlignHCenter)
        layout.addWidget(self._create_info_box("assets/icons/humidity.png", "Procent: 98%", "Wartość: 20302"), alignment=Qt.AlignHCenter)
        layout.addWidget(self._create_info_box("assets/icons/temperature.png", "Procent: 98%", "Wartość: 20302"), alignment=Qt.AlignHCenter)

        self.setLayout(layout)

    def _create_info_box(self, icon_path, percent, value):
        box = QFrame()
        box.setStyleSheet("background-color: white; border-radius: 10px; padding: 4px; margin: 6px;")
        box.setFixedWidth(140)
        box.setFixedHeight(150)

        layout = QVBoxLayout(box)
        layout.setContentsMargins(2, 2, 2, 2)
        layout.setSpacing(2)

        icon = QLabel()
        icon.setPixmap(QPixmap(icon_path).scaled(50, 50, Qt.KeepAspectRatio, Qt.SmoothTransformation))
        icon.setAlignment(Qt.AlignCenter)
        layout.addWidget(icon)

        text_widget = QWidget()
        text_layout = QVBoxLayout(text_widget)
        text_layout.setContentsMargins(0, 0, 0, 0)
        text_layout.setSpacing(0)

        percent_label = QLabel(percent)
        percent_label.setAlignment(Qt.AlignCenter)
        percent_label.setFont(QFont("Arial", 9))
        percent_label.setWordWrap(False)

        value_label = QLabel(value)
        value_label.setAlignment(Qt.AlignCenter)
        value_label.setFont(QFont("Arial", 9))
        value_label.setWordWrap(False)

        text_layout.addWidget(percent_label)
        text_layout.addWidget(value_label)

        layout.addWidget(text_widget)

        return box
