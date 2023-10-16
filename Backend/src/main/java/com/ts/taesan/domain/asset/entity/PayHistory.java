package com.ts.taesan.domain.asset.entity;

import com.ts.taesan.global.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@SuperBuilder
@DynamicInsert
public class PayHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "tikkle_id")
    private Tikkle tikkle;

    // 1: 샀다치고, 2: 습관저금, 3: 절약챌린지
    @Column(name = "trans_type")
    private Integer transType;

    @Column(name = "trans_amt")
    private Long transAmount;

    @Column(name = "total_amt")
    private Long totalAmount;

}
